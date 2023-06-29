package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/rs/zerolog"

	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	gorillaContext "github.com/gorilla/context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	DB         *mongo.Client
	dbName     string
	collection string
	logger     zerolog.Logger
}

func NewHandler(db *mongo.Client) Handler {
	return Handler{db, "weGoNice", "users", logging.Get()}
}

func (h *Handler) loginUser(w http.ResponseWriter, r *http.Request) {
	var login models.Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		http.Error(w, "Failed to decode Login struct", http.StatusBadRequest)
		return
	}

	filter := bson.M{"email": login.Email}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user models.User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to find a user with the provided email")
		http.Error(w, "Failed to find user with the provided email", http.StatusNotFound)
		return
	}

	if err = checkPassword(login.Password, user.Password); err != nil {
		h.logger.Error().Err(err).Msg("Incorrect password")
		http.Error(w, "Incorrect password", http.StatusNotAcceptable)
		return
	}

	sessionToken, err := createToken(user.ID, false)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create token")
		http.Error(w, "Failed to create token", http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"id":           user.ID,
		"sessionToken": sessionToken,
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(response)
}

func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) {
	var user models.User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&user)

	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to decode body")
		http.Error(w, "Failed to decode body", http.StatusBadRequest)
		return
	}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	// Check if user already exists
	var existingUser models.User
	filter := bson.D{{Key: "email", Value: user.Email}}
	err = coll.FindOne(context.TODO(), filter).Decode(&existingUser)
	if err == nil {
		h.logger.Error().Err(err).Str("email", user.Email).Msg("User with email already exists")
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
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to hash password")
		http.Error(w, "Failed to process password", http.StatusInternalServerError)
		return
	}

	data := bson.M{
		"email":      user.Email,
		"password":   hashedPassword,
		"role":       "user",
		"createdAt":  time.Now(),
		"modifiedAt": time.Now(),
	}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to insert data")
		http.Error(w, "Failed to insert data", http.StatusInternalServerError)
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	sessionToken, err := createToken(userId, false)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to create token")
		http.Error(w, "Failed to create token", http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"id":           userId,
		"sessionToken": sessionToken,
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(response)
}

func (h *Handler) getTokenByToken(w http.ResponseWriter, r *http.Request) {
	userId, ok := gorillaContext.Get(r, "userId").(string)
	if !ok {
		http.Error(w, "Failed to check userId", http.StatusInternalServerError)
		return
	}

	token, err := createToken(userId, false)
	if err != nil {
		http.Error(w, "Failed to create token", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(token)
}
