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
		return
	}
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Error: Failed to find users: %v", err)
		http.Error(w, "Failed to find users", http.StatusNotFound)
		return
	}

	var users []models.User
	if err = cursor.All(context.TODO(), &users); err != nil {
		log.Printf("Error: Failed to parse users, %v", err)
		http.Error(w, "Failed to parse users", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (h *Handler) GetUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	userId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to ObjectID: %v", err)
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": userId}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Failed to find a user")
		http.Error(w, "Failed to find user", http.StatusNotFound)
		return
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

	var user models.User
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&user)

	if err != nil {
		log.Printf("Error: Failed to decode body: %v", err)
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	// Check if user already exists
	var existingUser models.User
	filter := bson.D{{Key: "email", Value: user.Email}}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingUser)
	if err == nil {
		log.Printf("Error: User with email %s already exists", user.Email)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotAcceptable)
		msg := "User with email " + user.Email + " already exists."

		response := map[string]string{
			"id": msg,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Hash password and create new user
	hashedPassword, err := auth.HashPassword(user.Password)
	if err != nil {
		log.Printf("Error: Failed to hash password: %s", err)
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	data := bson.D{{Key: "lastname", Value: user.Lastname}, {Key: "firstname", Value: user.Firstname}, {Key: "email", Value: user.Email}, {Key: "password", Value: hashedPassword}}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Failed insert data: %v", err)
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
		return
	}

	userId := cursor.InsertedID.(primitive.ObjectID)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(userId)
}

func (h *Handler) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to ObjectID: %v", err)
		http.Error(w, "Failed to parse id to ObjectID", http.StatusInternalServerError)
		return
	}

	var user models.User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&user)
	if err != nil {
		log.Printf("Error: Failed to decode request body for user: %v", r.Body)
		http.Error(w, "Failed to decode request body for user", http.StatusBadRequest)
		return
	}

	if !auth.IsEmailContextOk(user.Email, r) {
		http.Error(w, "Not authorized to update other user", http.StatusUnauthorized)
		return
	}

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{
		"lastname":  user.Lastname,
		"firstname": user.Firstname,
	}}
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Printf("Error: Failed to update user: %v", err)
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Failed to parse id to ObjectID: %v", err)
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": userID}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Failed to find user: %v", err)
		http.Error(w, "Failed to find user", http.StatusNotFound)
		return
	}

	if !auth.IsEmailContextOk(user.Email, r) {
		http.Error(w, "Not authorized to delete other user", http.StatusUnauthorized)
		return
	}

	filter = bson.M{"_id": userID}
	coll = h.DB.Database(h.dbName).Collection(h.collection)
	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted user")
}

func (h *Handler) DeleteAllUsers(w http.ResponseWriter, r *http.Request) {
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to delete all users", http.StatusUnauthorized)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	result, err := coll.DeleteMany(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Error: Failed to delete all users: %v", err)
		http.Error(w, "Failed to delete all users", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result.DeletedCount)
}
