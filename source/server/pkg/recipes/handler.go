package recipes

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
	{Key: "$project", Value: bson.M{
		"name":        1,
		"timeHours":   1,
		"timeMinutes": 1,
		"category":    1,
		"ingredients": 1,
		"steps":       1,
		"createdAt":   1,
		"modifiedAt":  1,
		"imageName":   1,
		"user":        bson.M{"$first": "$user"},
		"author":      bson.M{"$first": "$author"},
	}},
}

type Handler struct {
	DB         *mongo.Client
	dbName     string
	collection string
	logger     zerolog.Logger
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "recipes", logging.Get()}
}

func (h *Handler) GetAllRecipes(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	sortingStage := bson.D{{Key: "$sort", Value: bson.M{"name": 1}}}

	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{utils.AuthorLookup, utils.UserLookup, projectStage, sortingStage})
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find recipes")
		http.Error(w, "Failed to find recipes", http.StatusNotFound)
		return
	}

	var recipes []models.Recipe
	if err = cursor.All(context.TODO(), &recipes); err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse recipes")
		http.Error(w, "Failed to parse recipes", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(recipes)
}

func (h *Handler) CreateRecipe(w http.ResponseWriter, r *http.Request) {
	var recipe models.Recipe
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&recipe)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to decode body")
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	// Check if name for the recipe is provided
	if recipe.Name == "" {
		h.logger.Printf("Recipes Error: No recipe name provided")
		http.Error(w, "No recipe name provided", http.StatusNotAcceptable)
		return
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for user from request context")
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
		return
	}

	authorID, err := primitive.ObjectIDFromHex(recipe.AuthorID)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for author from request")
		http.Error(w, "Error: Failed to create ObjectID for author from request", http.StatusInternalServerError)
		return
	}

	data := bson.M{
		"name":        recipe.Name,
		"authorId":    authorID,
		"timeHours":   recipe.TimeHours,
		"timeMinutes": recipe.TimeMinutes,
		"category":    recipe.Category,
		"ingredients": recipe.Ingredients,
		"steps":       recipe.Steps,
		"userId":      userID,
		"createdAt":   time.Now(),
		"modifiedAt":  time.Now(),
		"imageName":   recipe.ImageName,
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		h.logger.Printf("Recipes Error: Failed to insert data")
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
		return
	}

	recipeID := cursor.InsertedID.(primitive.ObjectID)

	if recipe.ImageName != "" {
		// Set image name after retrieving the recipe id
		currentDate := time.Now().Format("2006-01-02")
		imageName := fmt.Sprintf("%s-%s-%s", currentDate, recipeID.Hex(), recipe.ImageName)

		filter := bson.M{"_id": recipeID}
		update := bson.M{"$set": bson.M{
			"imageName": imageName,
		}}

		coll = h.DB.Database(h.dbName).Collection(h.collection)
		_, err = coll.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			h.logger.Error().Err(err).Msg("Failed to update recipe with new imageName")
			http.Error(w, "Failed to update recipe with new imageName", http.StatusInternalServerError)
			return
		}

		tmpFileDepot := os.Getenv("TMP_FILE_DEPOT")
		tmpFilePath := fmt.Sprintf("%s/%s", tmpFileDepot, recipe.ImageName)

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
	json.NewEncoder(w).Encode(recipeID)
}

func (h *Handler) GetRecipeByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	recipeID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to ObjectID")
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var recipes []models.Recipe
	matchStage := bson.D{{Key: "$match", Value: bson.M{"_id": recipeID}}}
	limitStage := bson.D{{Key: "$limit", Value: 1}}

	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.UserLookup, utils.AuthorLookup, projectStage, limitStage})
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find recipe")
		http.Error(w, "Failed to find recipe", http.StatusNotFound)
		return
	}

	if err = cursor.All(context.TODO(), &recipes); err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse recipes")
		http.Error(w, "Failed to parse recipes", http.StatusInternalServerError)
		return
	}

	if len(recipes) < 1 {
		h.logger.Error().Err(err).Msg("Failed to find recipe")
		http.Error(w, "Failed to find recipe", http.StatusNotFound)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(recipes[0])
}

func (h *Handler) UpdateRecipeByID(w http.ResponseWriter, r *http.Request) {
	var recipe models.Recipe
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&recipe)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to decode request body for recipe")
		http.Error(w, "Failed to decode request body for recipe", http.StatusBadRequest)
		return
	}

	id := mux.Vars(r)["id"]
	recipeID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to recipeID")
		http.Error(w, "Failed to parse id to recipeID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var existingRecipe models.Recipe
	filter := bson.M{"_id": recipeID}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingRecipe)
	if err != nil {
		h.logger.Error().Err(err).Str("recipeID", id).Msg("Failed to find existing recipe with ID")
		http.Error(w, "Failed to find existing recipe with the provided ID", http.StatusBadRequest)
	}

	if existingRecipe.ImageName != recipe.ImageName {
		fmt.Println("___________________DELETE")
		existingFilePath := fmt.Sprintf("%s/%s", os.Getenv("FILE_DEPOT"), existingRecipe.ImageName)
		if err = os.Remove(existingFilePath); err != nil {
			h.logger.Error().Err(err).Str("existingFilePath", existingFilePath).Msg("Failed to delete image with path")
		}
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for user from request context")
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
		return
	}

	authorID, err := primitive.ObjectIDFromHex(recipe.AuthorID)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create ObjectID for author from request")
		http.Error(w, "Error: Failed to create ObjectID for author from request", http.StatusInternalServerError)
		return
	}

	imageName := recipe.ImageName
	if !strings.Contains(recipe.ImageName, id) {
		fileNameSlice := strings.Split(recipe.ImageName, ".")
		currentDate := time.Now().Format("2006-01-02")
		iName := fileNameSlice[0]
		iNameType := strings.ToLower(fileNameSlice[1])
		imageName = fmt.Sprintf("%s-%s-%s.%s", currentDate, id, iName, iNameType)
	}

	fmt.Println("========")
	fmt.Printf("%s\n", imageName)
	fmt.Println("========")

	filter = bson.M{"_id": recipeID}
	update := bson.M{"$set": bson.M{
		"name":        recipe.Name,
		"authorId":    authorID,
		"timeHours":   recipe.TimeHours,
		"timeMinutes": recipe.TimeMinutes,
		"category":    recipe.Category,
		"ingredients": recipe.Ingredients,
		"steps":       recipe.Steps,
		"imageName":   imageName,
		"userId":      userID,
		"modifiedAt":  time.Now(),
	}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to update recipe")
		http.Error(w, "Failed to update recipe", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteRecipeByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	recipeID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to parse id to recipeID")
		http.Error(w, "Failed to parse id to recipeID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)
	filter := bson.M{"_id": recipeID}

	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted recipe")
}
