package users

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/rs/zerolog/log"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/utils"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	DB         *mongo.Client
	dbName     string
	collection string
	logger     utils.Logger
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "users", utils.NewLogger()}
}

func (h *Handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	h.logger.LogEndpointHit(r)
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to view all users", http.StatusUnauthorized)
		return
	}
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Err(err).Msg("Failed to find users")
		http.Error(w, "Failed to find users", http.StatusNotFound)
		return
	}

	var users []models.User
	if err = cursor.All(context.TODO(), &users); err != nil {
		log.Err(err).Msg("Failed to parse users")
		http.Error(w, "Failed to parse users", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (h *Handler) GetUserById(w http.ResponseWriter, r *http.Request) {
	h.logger.LogEndpointHit(r)
	id := mux.Vars(r)["id"]

	userId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Err(err).Msg("Failed to parse id to ObjectID")
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": userId}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Err(err).Msg("Failed to find a user")
		http.Error(w, "Failed to find user", http.StatusNotFound)
		return
	}

	if !auth.IsUserIdContextOk(user.ID, r) && !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to see details about another user", http.StatusUnauthorized)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	h.logger.LogEndpointHit(r)
	if !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to create user", http.StatusUnauthorized)
		return
	}

	var user models.User
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&user)

	if err != nil {
		log.Err(err).Msg("Failed to decode body")
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	// Check if user already exists
	var existingUser models.User
	filter := bson.D{{Key: "email", Value: user.Email}}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingUser)
	if err == nil {
		log.Err(err).Str("userEmail", user.Email).Msg("User already exists")
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
		log.Err(err).Msg("Failed to hash password")
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	data := bson.D{{Key: "lastName", Value: user.LastName}, {Key: "firstName", Value: user.FirstName}, {Key: "email", Value: user.Email}, {Key: "password", Value: hashedPassword}}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Err(err).Msg("Failed insert data")
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
		return
	}

	userId := cursor.InsertedID.(primitive.ObjectID)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(userId)
}

func (h *Handler) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	h.logger.LogEndpointHit(r)
	id := mux.Vars(r)["id"]

	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Err(err).Msg("Failed to parse id to ObjectID")
		http.Error(w, "Failed to parse id to ObjectID", http.StatusInternalServerError)
		return
	}

	var user models.User
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&user)
	if err != nil {
		log.Err(err).Msg("Failed to decode request body for user")
		http.Error(w, "Failed to decode request body for user", http.StatusBadRequest)
		return
	}

	if !auth.IsUserIdContextOk(id, r) && !auth.IsAdminContextOk(r) {
		http.Error(w, "Not authorized to update other user", http.StatusUnauthorized)
		return
	}

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{
		"lastName":  user.LastName,
		"firstName": user.FirstName,
	}}
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Err(err).Msg("Failed to update user")
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteUserById(w http.ResponseWriter, r *http.Request) {
	h.logger.LogEndpointHit(r)
	id := mux.Vars(r)["id"]

	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Err(err).Msg("Failed to parse id to ObjectID")
		http.Error(w, "Failed to parse id to ObjectID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": userID}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Err(err).Msg("Failed to find user")
		http.Error(w, "Failed to find user", http.StatusNotFound)
		return
	}

	if !auth.IsUserIdContextOk(id, r) && !auth.IsAdminContextOk(r) {
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
