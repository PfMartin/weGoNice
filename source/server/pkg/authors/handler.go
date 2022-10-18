package authors

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

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
	return Handler{db, "weGoNice", "authors"}
}

func (h *Handler) GetAllAuthors(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	filter := bson.D{}
	cursor, err := coll.Find(context.TODO(), filter)
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
	filter := bson.D{{Key: "name", Value: author.Name}}
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

	data := bson.D{{Key: "name", Value: author.Name}, {Key: "websiteUrl", Value: author.WebsiteUrl}, {Key: "instagram", Value: author.Instagram}, {Key: "youTube", Value: author.YouTube}, {Key: "userId", Value: author.UserId}}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Failed to insert data: %v", err)
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
		return
	}

	authorId := cursor.InsertedID.(primitive.ObjectID)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(authorId)

}
