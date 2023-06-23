package recipes

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
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
		{Key: "time", Value: 1},
		{Key: "timeUnit", Value: 1},
		{Key: "category", Value: 1},
		{Key: "ingredients", Value: 1},
		{Key: "steps", Value: 1},
		{Key: "createdAt", Value: 1},
		{Key: "modifiedAt", Value: 1},
		{Key: "user", Value: bson.D{{Key: "$first", Value: "$user"}}},
		{Key: "author", Value: bson.D{{Key: "$first", Value: "$author"}}},
	}},
}

type Handler struct {
	DB         *mongo.Client
	dbName     string
	collection string
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "recipes"}
}

func (h *Handler) GetAllRecipes(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	matchStage := bson.D{
		{Key: "$match", Value: bson.D{{}}},
	}
	sortingStage := bson.D{
		{Key: "$sort", Value: bson.D{{Key: "name", Value: 1}}}}

	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.AuthorLookup, utils.UserLookup, projectStage, sortingStage})
	if err != nil {
		log.Printf("Error: Failed to find recipes: %s", err)
		http.Error(w, "Failed to find recipes", http.StatusNotFound)
	}

	var recipes []models.Recipe
	if err = cursor.All(context.TODO(), &recipes); err != nil {
		log.Printf("Error: Failed to parse recipes, %s", err)
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
		log.Printf("Error: Failed to decode body: %v", err)
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	// Check if name for the recipe is provided
	if recipe.Name == "" {
		log.Printf("Recipes Error: No recipe name provided")
		http.Error(w, "No recipe name provided", http.StatusNotAcceptable)
		return
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		log.Printf("Error: Failed to create ObjectID for user from request context, %v", err)
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	authorID, err := primitive.ObjectIDFromHex(recipe.AuthorID)
	if err != nil {
		log.Printf("Error: Failed to create ObjectID for author from request, %s", err)
		http.Error(w, "Error: Failed to create ObjectID for author from request", http.StatusInternalServerError)
	}

	data := bson.M{
		"name":        recipe.Name,
		"authorId":    authorID,
		"time":        recipe.Time,
		"category":    recipe.Category,
		"ingredients": recipe.Ingredients,
		"steps":       recipe.Steps,
		"userId":      userID,
		"createdAt":   time.Now(),
		"modifiedAt":  time.Now(),
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Recipes Error: Failed to insert data: %v", err)
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
	}

	recipeID := cursor.InsertedID.(primitive.ObjectID)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(recipeID)
}

func (h *Handler) GetRecipeByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	recipeID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to ObjectID: %v", err)
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var recipes []models.Recipe
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "_id", Value: recipeID}}}}
	limitStage := bson.D{{Key: "$limit", Value: 1}}

	cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, utils.UserLookup, utils.AuthorLookup, projectStage, limitStage})
	if err != nil {
		log.Printf("Error: Failed to find recipe")
		http.Error(w, "Failed to find recipe", http.StatusNotFound)
		return
	}

	if err = cursor.All(context.TODO(), &recipes); err != nil {
		log.Printf("Error: Failed to parse recipes, %v", err)
		http.Error(w, "Failed to parse recipes", http.StatusInternalServerError)
		return
	}

	if len(recipes) < 1 {
		log.Printf("Error: Failed to find recipe")
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
		log.Printf("Error: Failed to decode request body for recipe: %v", r.Body)
		http.Error(w, "Failed to decode request body for recipe", http.StatusBadRequest)
		return
	}

	id := mux.Vars(r)["id"]
	recipeID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to recipeID: %v", err)
		http.Error(w, "Failed to parse id to recipeID", http.StatusBadRequest)
		return
	}

	userID, err := auth.GetUserIDFromCtx(r)
	if err != nil {
		log.Printf("Error: Failed to create ObjectID for user from request context, %v", err)
		http.Error(w, "Error: Failed to create ObjectID for user from request context", http.StatusInternalServerError)
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	filter := bson.M{"_id": recipeID}
	update := bson.M{"$set": bson.M{
		"name":        recipe.Name,
		"authorId":    recipe.AuthorID,
		"time":        recipe.Time,
		"timeUnit":    recipe.TimeUnit,
		"category":    recipe.Category,
		"ingredients": recipe.Ingredients,
		"steps":       recipe.Steps,
		"userId":      userID,
		"modifiedAt":  time.Now(),
	}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Printf("Error: Failed to update recipe: %v", err)
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
		log.Printf("Error: Failed to parse id to recipeID: %v", err)
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
