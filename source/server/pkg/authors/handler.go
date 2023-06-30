package authors

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/files"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/utils"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var projectStage = bson.D{
	{Key: "$project", Value: bson.D{
		{Key: "name", Value: 1},
		{Key: "firstName", Value: 1},
		{Key: "lastName", Value: 1},
		{Key: "website", Value: 1},
		{Key: "instagram", Value: 1},
		{Key: "youTube", Value: 1},
		{Key: "createdAt", Value: 1},
		{Key: "imageName", Value: 1},
		{Key: "modifiedAt", Value: 1},
		{Key: "user", Value: bson.D{{Key: "$first", Value: "$user"}}}}}}

type Handler struct {
	DB         *mongo.Client
	dbName     string
	collection string
	logger     zerolog.Logger
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{
		db,
		"weGoNice",
		"authors",
		logging.Get(),
	}
}

func (h *Handler) GetAllAuthors(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	sortingStage := bson.D{
		{Key: "$sort", Value: bson.D{{Key: "name", Value: 1}}},
	}
	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{utils.UserLookup, projectStage, sortingStage})
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find authors")
		http.Error(w, "Failed to find authors", http.StatusNotFound)
		return
	}

	var authors []models.AuthorResponse
	if err = cursor.All(context.TODO(), &authors); err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse authors, %v")
		http.Error(w, "Failed to parse authors", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(authors)
}

func (h *Handler) GetAuthorByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	authorID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to ObjectID")
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var authors []models.AuthorResponse
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "_id", Value: authorID}}}}
	limitStage := bson.D{{Key: "$limit", Value: 1}}
	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.UserLookup, projectStage, limitStage})
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find author")
		http.Error(w, "Failed to find author", http.StatusNotFound)
		return
	}

	if err = cursor.All(context.TODO(), &authors); err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse authors, %v")
		http.Error(w, "Failed to parse authors", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(authors[0])
}

func (h *Handler) CreateAuthor(w http.ResponseWriter, r *http.Request) {
	var author models.AuthorRequest
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&author)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to decode body")
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var existingAuthor models.AuthorResponse
	filter := bson.M{"name": author.Name}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingAuthor)
	if err == nil {
		h.logger.Error().Err(err).Str("authorName", author.Name).Msg("Author already exists")
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotAcceptable)
		msg := "Author with name " + author.Name + " already exists."

		response := map[string]string{
			"id": msg,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for user from request context, %v")
		http.Error(w, "Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	data := bson.M{
		"name":       author.Name,
		"firstName":  author.FirstName,
		"lastName":   author.LastName,
		"website":    author.Website,
		"instagram":  author.Instagram,
		"youTube":    author.YouTube,
		"imageName":  author.ImageName,
		"userId":     userID,
		"createdAt":  time.Now(),
		"modifiedAt": time.Now(),
	}

	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to insert data")
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
		return
	}

	authorID := cursor.InsertedID.(primitive.ObjectID)

	if author.ImageName != "" {
		// Set imageName after retrieving the author id
		currentDate := time.Now().Format("2006-01-02")
		imageName := fmt.Sprintf("%s-%s-%s", currentDate, authorID.Hex(), author.ImageName)

		filter = bson.M{"_id": authorID}
		update := bson.M{"$set": bson.M{
			"imageName": imageName,
		}}

		coll = h.DB.Database(h.dbName).Collection(h.collection)
		_, err = coll.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			h.logger.Error().Err(err).Msg("Failed to update author with new imageName")
			http.Error(w, "Failed to update author with new imageName", http.StatusInternalServerError)
			return
		}

		tmpFileDepot := os.Getenv("TMP_FILE_DEPOT")
		tmpFilePath := fmt.Sprintf("%s/%s", tmpFileDepot, author.ImageName)

		fileDepot := os.Getenv("FILE_DEPOT")
		filePath := fmt.Sprintf("%s/%s", fileDepot, imageName)

		fileHandler := files.NewHandler()

		err = fileHandler.MoveTmpFileToPerm(tmpFilePath, filePath, true)
		if err != nil {
			h.logger.Error().Err(err).Send()
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(authorID)
}

func (h *Handler) UpdateAuthorByID(w http.ResponseWriter, r *http.Request) {
	var author models.AuthorRequest
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&author)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to decode request body for author")
		http.Error(w, "Failed to decode request body for author", http.StatusBadRequest)
		return
	}

	id := mux.Vars(r)["id"]
	authorID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to authorID")
		http.Error(w, "Failed to parse id to authorID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var existingAuthor models.AuthorDB
	filter := bson.M{"_id": authorID}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingAuthor)
	if err != nil {
		h.logger.Error().Err(err).Str("authorID", id).Msg("Failed to find existing with ID")
		http.Error(w, "Failed to find existing author with the provided ID", http.StatusBadRequest)
	}

	if existingAuthor.ImageName != author.ImageName {
		existingFilePath := fmt.Sprintf("%s/%s", os.Getenv("FILE_DEPOT"), existingAuthor.ImageName)
		if err = os.Remove(existingFilePath); err != nil {
			h.logger.Error().Err(err).Str("existingFilePath", existingFilePath).Msg("Failed to delete image with path")
		}
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for user from request context")
		http.Error(w, "Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	imageName := author.ImageName

	if !strings.Contains(author.ImageName, id) {
		fileNameSlice := strings.Split(author.ImageName, ".")
		currentDate := time.Now().Format("2006-01-02")
		iName := fileNameSlice[0]
		iNameType := strings.ToLower(fileNameSlice[1])
		imageName = fmt.Sprintf("%s-%s-%s.%s", currentDate, id, iName, iNameType)
	}

	filter = bson.M{"_id": authorID}
	update := bson.M{"$set": bson.M{
		"name":       author.Name,
		"firstName":  author.FirstName,
		"lastName":   author.LastName,
		"website":    author.Website,
		"instagram":  author.Instagram,
		"youTube":    author.YouTube,
		"imageName":  imageName,
		"userId":     userID,
		"modifiedAt": time.Now(),
	}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to update author")
		http.Error(w, "Failed to update author", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteAuthorByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	authorID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to authorID")
		http.Error(w, "Failed to parse id to authorID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	filter := bson.M{"_id": authorID}

	var author models.AuthorDB
	err = coll.FindOne(context.TODO(), filter).Decode(&author)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find author")
		http.Error(w, "Failed to find author", http.StatusNotFound)
		return
	}

	filePath := fmt.Sprintf("%s/%s", os.Getenv("FILE_DEPOT"), author.ImageName)

	err = os.Remove(filePath)
	if err != nil {
		h.logger.Error().Err(err).Str("filePath", filePath).Msg("Failed to remove image for author")
	}

	coll = h.DB.Database(h.dbName).Collection(h.collection)
	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted author")
}
