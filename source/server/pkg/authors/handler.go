package authors

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
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
		{Key: "firstname", Value: 1},
		{Key: "lastname", Value: 1},
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
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "authors"}
}

func (h *Handler) GetAllAuthors(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{},
	}}}
	sortingStage := bson.D{{Key: "$sort", Value: bson.D{
		{Key: "name", Value: 1},
	}}}
	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.UserLookup, projectStage, sortingStage})
	if err != nil {
		log.Printf("Error: Failed to find authors: %v", err)
		http.Error(w, "Failed to find authors", http.StatusNotFound)
		return
	}

	var authors []models.AuthorResponse
	if err = cursor.All(context.TODO(), &authors); err != nil {
		log.Printf("Error: Failed to parse authors, %v", err)
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
		log.Printf("Error: Failed to parse id to ObjectID: %v", err)
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var authors []models.AuthorResponse
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "_id", Value: authorID}}}}
	limitStage := bson.D{{Key: "$limit", Value: 1}}
	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.UserLookup, projectStage, limitStage})
	if err != nil {
		log.Printf("Error: Failed to find author")
		http.Error(w, "Failed to find author", http.StatusNotFound)
		return
	}

	if err = cursor.All(context.TODO(), &authors); err != nil {
		log.Printf("Error: Failed to parse authors, %v", err)
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
		log.Printf("Error: Failed to decode body: %v", err)
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var existingAuthor models.AuthorResponse
	filter := bson.M{"name": author.Name}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingAuthor)
	if err == nil {
		log.Printf("Error: Author with name %s already exists", author.Name)
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
		log.Printf("Error: Failed to create ObjectID for user from request context, %v", err)
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	data := bson.M{
		"name":       author.Name,
		"firstname":  author.Firstname,
		"lastname":   author.Lastname,
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
		log.Printf("Error: Failed to insert data: %v", err)
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
			log.Printf("Error: Failed to update author with new imageName: %v", err)
			http.Error(w, "Failed to update author with new imageName", http.StatusInternalServerError)
			return
		}

		tmpFileDepot := os.Getenv("TMP_FILE_DEPOT")
		tmpFilePath := fmt.Sprintf("%s/%s", tmpFileDepot, author.ImageName)

		fileDepot := os.Getenv("FILE_DEPOT")
		filePath := fmt.Sprintf("%s/%s", fileDepot, imageName)
		err = h.MoveTmpFileToPerm(tmpFilePath, filePath)
		if err != nil {
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
		log.Printf("Error: Failed to decode request body for author: %v", r.Body)
		http.Error(w, "Failed to decode request body for author", http.StatusBadRequest)
		return
	}

	id := mux.Vars(r)["id"]
	authorID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to authorID: %v", err)
		http.Error(w, "Failed to parse id to authorID", http.StatusBadRequest)
		return
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		log.Printf("Error: Failed to create ObjectID for user from request context, %v", err)
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	currentDate := time.Now().Format("2006-01-02")
	imageNameSlice := strings.Split(author.ImageName, ".")
	iName := imageNameSlice[0]
	iNameType := strings.ToLower(imageNameSlice[1])

	imageName := fmt.Sprintf("%s-%s-%s.%s", currentDate, id, iName, iNameType)

	filter := bson.M{"_id": authorID}
	update := bson.M{"$set": bson.M{
		"name":       author.Name,
		"firstname":  author.Firstname,
		"lastname":   author.Lastname,
		"website":    author.Website,
		"instagram":  author.Instagram,
		"youTube":    author.YouTube,
		"imageName":  imageName,
		"userId":     userID,
		"modifiedAt": time.Now(),
	}}

	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Printf("Error: Failed to update author: %v", err)
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
		log.Printf("Error: Failed to parse id to authorID: %v", err)
		http.Error(w, "Failed to parse id to authorID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": authorID}
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted author")
}

func (h *Handler) MoveTmpFileToPerm(tmpFilePath string, filePath string) error {
	errMsg := "Failed to update author with new imageName"

	tmpFile, err := os.Open(tmpFilePath)
	if err != nil {
		log.Printf("Error: Failed to open temporary file during file copy: %s", err)
		return fmt.Errorf(errMsg)
	}

	permFile, err := os.Create(filePath)
	if err != nil {
		tmpFile.Close()
		return fmt.Errorf(errMsg)
	}
	defer permFile.Close()

	_, err = io.Copy(permFile, tmpFile)
	tmpFile.Close()
	if err != nil {
		log.Printf("Error: Failed to copy temporary file to file: %s", err)
		return fmt.Errorf(errMsg)
	}

	err = os.Remove(tmpFilePath)
	if err != nil {
		log.Printf("Error: Failed to remove temp file: %s", err)
		return fmt.Errorf(errMsg)
	}

	return nil
}
