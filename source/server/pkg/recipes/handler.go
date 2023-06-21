package recipes

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

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

	filter := bson.D{}
	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		log.Printf("Error: Failed to find recipes: %v", err)
		http.Error(w, "Failed to find recipes", http.StatusNotFound)
	}

	var recipes []models.RecipeRequest
	if err = cursor.All(context.TODO(), &recipes); err != nil {
		log.Printf("Error: Failed to parse recipes, %v", err)
		http.Error(w, "Failed to parse recipes", http.StatusInternalServerError)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(recipes)
}

func (h *Handler) CreateRecipe(w http.ResponseWriter, r *http.Request) {
	var recipe models.RecipeRequest
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

	data := bson.M{
		"name":        recipe.Name,
		"authorId":    recipe.AuthorID,
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
