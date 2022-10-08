package users

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/gorilla/mux"
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
	return Handler{db, "weGoNice", "users"}
}


func (h *Handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to view all users", http.StatusUnauthorized)
	}
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Error: Couldn't read data: %v", err)
	}

	var users []models.User
	if err = cursor.All(context.TODO(), &users); err != nil {
		log.Printf("Error: Couldn't parse users, %v", err)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (h *Handler) GetUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Could not parse id to objectId: %v", err)
	}

	filter := bson.M{"_id": objectId}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Couldn't find a user")
	}

	if !auth.IsEmailContextOk(user.Email, r) {
		http.Error(w, "Not authorized to see details about another user", http.StatusUnauthorized)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to create user", http.StatusUnauthorized)
		return
	}

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
	hashedPassword, err := auth.HashPassword(payload.Password)
	if err != nil {
		log.Printf("Failed to hash password: %s", err)
		return
	}
	
	data := bson.D{{Key: "lastname", Value: payload.Lastname}, {Key: "firstname", Value: payload.Firstname}, {Key: "email", Value: payload.Email}, {Key: "password", Value: hashedPassword}}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Couldn't insert data: %v", err)
	}
	
	userId := cursor.InsertedID.(primitive.ObjectID)
	
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(userId)
}

func (h *Handler) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Failed to parse id to ObjectID", http.StatusInternalServerError)
	}

	var user models.User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&user)
	if err != nil {
		log.Printf("Failed to decode user: %v", r.Body)
		http.Error(w, "Failed to decode user", http.StatusInternalServerError)
		return
	}

	if !auth.IsEmailContextOk(user.Email, r) {
		http.Error(w, "Not authorized to update other user", http.StatusUnauthorized)
	}

	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{
		"lastname": user.Lastname,
		"firstname": user.Firstname,
	}}
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Could not parse id to objectId: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": objectId}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Couldn't find a user")
	}

	if !auth.IsEmailContextOk(user.Email, r) {
		http.Error(w, "Not authorized to delete other user", http.StatusUnauthorized)
	}

	filter = bson.M{"_id": objectId}
	coll = h.DB.Database(h.dbName).Collection(h.collection)
	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted user")
}

func (h *Handler) DeleteAllUsers(w http.ResponseWriter, r *http.Request) {
	// Admin check
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to delete all users", http.StatusUnauthorized)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	result, err := coll.DeleteMany(context.TODO(), bson.D{})
	if err != nil {
		http.Error(w, "Failed to dele all users", http.StatusInternalServerError)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result.DeletedCount)
}