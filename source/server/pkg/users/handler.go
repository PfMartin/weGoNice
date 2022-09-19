package users

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
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
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	cursor, err := coll.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Printf("Error: Couldn't read data: %v", err)
	}

	var users []User
	if err = cursor.All(context.TODO(), &users); err != nil {
		log.Printf("Error: Couldn't parse users, %v", err)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)

	logSuccess("getAll", "none")
}

func (h *Handler) GetUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Could not parse id to objectId: %v", err)
	}

	filter := bson.M{"_id": objectId}

	coll := h.DB.Database(h.dbName).Collection(h.collection)

	var user User
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error: Couldn't find a user")
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)

	logSuccess("getById", objectId.String())
}

func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	var payload User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&payload)

	if err != nil {
		log.Printf("Could not decode body: %v", err)
	}

	hashedPassword, err := auth.HashPassword(payload.Password)

	if err != nil {
		log.Printf("Failed to hash password: %s", err)
		return
	}

	data := bson.D{{Key: "lastname", Value: payload.Lastname}, {Key: "firstname", Value: payload.Firstname}, {Key: "email", Value: payload.Email}, {Key: "password", Value: hashedPassword}}

	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.InsertOne(context.TODO(), data)

	if err != nil {
		log.Printf("Error: Couldn't insert data: %v", err)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)

	logSuccess("add", "none")
}

/**
UPDATE USER BY ID
Replaces all fields of the current user with the new data
*/
func (h *Handler) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Error: Could not parse id to objectId: %v", err)
	}

	var user User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&user)

	if err != nil {
		log.Printf("Could not decode body: %v", err)
	}

	filter := bson.M{"_id": objectId}
	data := bson.D{{Key: "lastname", Value: user.Lastname}, {Key: "firstname", Value: user.Firstname}, {Key: "email", Value: user.Email}, {Key: "password", Value: user.Password}}

	coll := h.DB.Database(h.dbName).Collection(h.collection)
	result, err := coll.ReplaceOne(context.TODO(), filter, data)
	if err != nil {
		log.Printf("Error: Couldn't update user: %v", err)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)

	logSuccess("updateById", objectId.String())
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

	coll.DeleteOne(context.TODO(), filter)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted user")

	logSuccess("deleteById", objectId.String())
}

func (h *Handler) DeleteAllUsers(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	result, err := coll.DeleteMany(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Error: Couldn't find a user")
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result.DeletedCount)

	logSuccess("deleteAll", "none")
}

func logSuccess(operation string, objectId string) {
	var operationText string

	switch operation {
	case "getAll":
		operationText = "returned all users"
	case "getById":
		operationText = "returned user with id: " + objectId
	case "add":
		operationText = "added user"
	case "deleteAll":
		operationText = "deleted all users"
	case "deleteById":
		operationText = "deleted user with id: " + objectId
	case "updateById":
		operationText = "updated user with id: " + objectId
	}

	log.Printf("Successfully %s\n", operationText)
}
