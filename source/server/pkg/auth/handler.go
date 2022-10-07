package auth

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
	DB *mongo.Client
	dbName string
	collection string
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "users"}
}

func (h *Handler) loginUser(w http.ResponseWriter, r *http.Request) {
	var login models.Login;

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		http.Error(w, "failed to decode Login struct", http.StatusBadRequest)
		return
	}

	filter := bson.M{"email": login.Email}
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Couldn't find a user with the provided email")
		http.Error(w, "failed to find user with the provided email", http.StatusNotFound)
	}

	log.Println("user logged in")
	log.Println(user)
}

func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) {
	var payload models.User

	
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&payload)
	
	if err != nil {
		log.Printf("Could not decode body: %v", err)
	}
	
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	
	// Check if user already exists
	var existingUser models.User	
	filter := bson.D{{Key: "email", Value: payload.Email}}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingUser)
	if err == nil {
		log.Printf("%s\n", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotAcceptable)
		msg := "User with email "+ payload.Email + " already exists."
		
		response := map[string]string{
			"id": msg,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	
	// Hash password and create new user
	hashedPassword, err := HashPassword(payload.Password)
	if err != nil {
		log.Printf("Failed to hash password: %s", err)
		return
	}
	
	data := bson.D{{Key: "lastname", Value: payload.Lastname}, {Key: "firstname", Value: payload.Firstname}, {Key: "email", Value: payload.Email}, {Key: "password", Value: hashedPassword}}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Couldn't insert data: %v", err)
	}
	
	userId := cursor.InsertedID.(primitive.ObjectID).String()
	// sessionToken := auth.GetSessionToken(w, r, h.DB, userId)
	sessionToken := "dummy"
	
	response := map[string]string{
		"id": userId,
		"sessionToken": sessionToken,
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)

	logSuccess("add", payload.Email)
}

func logSuccess(operation string, objectInfo string) {
	var operationText string

	switch operation {
	case "getAll":
		operationText = "returned all users"
	case "getById":
		operationText = "returned user with id: " + objectInfo
	case "add":
		operationText = "added user: " + objectInfo 
	case "deleteAll":
		operationText = "deleted all users"
	case "deleteById":
		operationText = "deleted user with id: " + objectInfo
	case "updateById":
		operationText = "updated user with id: " + objectInfo
	}

	log.Printf("Successfully %s\n", operationText)
}