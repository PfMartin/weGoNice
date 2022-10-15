package recipes

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
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

	var recipes []models.Recipe
	if err = cursor.All(context.TODO(), &recipes); err != nil {
		log.Printf("Error: Failed to parse recipes, %v", err)
		http.Error(w, "Failed to parse recipes", http.StatusInternalServerError)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(recipes)
}
