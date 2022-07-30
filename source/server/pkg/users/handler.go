package users

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
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
	fmt.Println(users)

}

// func (h *Handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
// 	var users []User

// 	if result := h.DB.Find(&users); result.Error != nil {
// 		log.Fatalln(result.Error)
// 	}

// 	w.Header().Add("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(users)
// }

// func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	id, _ := strconv.Atoi(vars["id"])

// 	var user User

// 	if result := h.DB.First(&user, id); result.Error != nil {
// 		log.Fatalln(result.Error)
// 	}

// 	w.Header().Add("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(user)
// }

func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)

	params := mux.Vars(r)
	fmt.Println(params["firstname"])

	data := bson.D{{Key: "lastname", Value: "Pfatrisch"}, {Key: "firstname", Value: "Martin"}, {Key: "email", Value: "martinpfatrisch@gmail.com"}, {Key: "password", Value: "Jahnel01"}}

	result, err := coll.InsertOne(context.TODO(), data)

	if err != nil {
		log.Fatalf("Error: Couldn't insert data: %v", err)
	}

	fmt.Println(result)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Created")
}

// func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	id, _ := strconv.Atoi(vars["id"])

// 	defer r.Body.Close()
// 	body, err := ioutil.ReadAll(r.Body)

// 	if err != nil {
// 		log.Fatalln(err)
// 	}

// 	var updatedUser User
// 	json.Unmarshal(body, &updatedUser)

// 	var user User

// 	if result := h.DB.First(&user, id); result.Error != nil {
// 		log.Fatalln(result.Error)
// 	}

// 	user.Lastname = updatedUser.Lastname
// 	user.Firstname = updatedUser.Firstname
// 	user.Age = updatedUser.Age
// 	user.Email = updatedUser.Email

// 	h.DB.Save(&user)

// 	w.Header().Add("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode("Updated")
// }

// func (h *Handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	id, _ := strconv.Atoi(vars["id"])

// 	var user User

// 	if result := h.DB.First(&user, id); result.Error != nil {
// 		log.Fatalln(result.Error)
// 	}

// 	h.DB.Delete(&user)

// 	w.Header().Add("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode("Deleted")
// }
