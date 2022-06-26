package users

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func NewHandler(db *gorm.DB) handler {
	return handler{db}
}

func (h handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	var users []User

	if result := h.DB.Find(&users); result.Error != nil {
		fmt.Println(result.Error)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}
func (h handler) GetUser(w http.ResponseWriter, r *http.Request) {}
func (h handler) AddUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var user User
	json.Unmarshal(body, &user)

	if result := h.DB.Create(&user); result.Error != nil {
		fmt.Println(result.Error)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Created")
}
func (h handler) UpdateUser(w http.ResponseWriter, r *http.Request) {}
func (h handler) DeleteUser(w http.ResponseWriter, r *http.Request) {}

// var Users = []User{
// 	{
// 		Id:        1,
// 		Lastname:  "Pfatrisch",
// 		Firstname: "Martin",
// 		Age:       30,
// 		Email:     "martinpfatrisch@gmail.com",
// 	},
// }

// func getAllUsers(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Add("Content-Type", "application/json")

// 	var user User

// 	db.First(&user)
// 	json.NewEncoder(w).Encode(&user)
// }

// func getUserById(w http.ResponseWriter, r *http.Request) {
// 	id := mux.Vars(r)["id"]

// 	var user User
// 	db.First(&user, id)
// 	json.NewEncoder(w).Encode(&user)
// }

// func createUser(w http.ResponseWriter, r *http.Request) {
// 	u := User{}

// 	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Error decoding response object", http.StatusBadRequest)
// 		return
// 	}

// 	users = append(users, u)

// 	response, err := json.Marshal(&u)
// 	if err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Add("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusCreated)
// 	w.Write(response)
// }

// func indexById(users []User, id string) int {
// 	for i := 0; i < len(users); i++ {
// 		if users[i].Id == id {
// 			return i
// 		}
// 	}

// 	return -1
// }

// func getUserById(w http.ResponseWriter, r *http.Request) {
// 	id := mux.Vars(r)["id"]
// 	index := indexById(users, id)

// 	if index < 0 {
// 		http.Error(w, "User not found", http.StatusNotFound)
// 		return
// 	}

// 	w.Header().Add("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(users[index]); err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
// 	}
// }

// func updateUser(w http.ResponseWriter, r *http.Request) {
// 	id := mux.Vars(r)["id"]
// 	fmt.Println(id)
// 	index := indexById(users, id)
// 	if index < 0 {
// 		http.Error(w, "User not found", http.StatusNotFound)
// 		return
// 	}

// 	u := User{}
// 	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Error decoding response object", http.StatusBadRequest)
// 		return
// 	}

// 	users[index] = u

// 	w.Header().Add("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(&u); err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
// 	}
// }

// func deleteUser(w http.ResponseWriter, r *http.Request) {
// 	id := mux.Vars(r)["id"]
// 	index := indexById(users, id)
// 	if index < 0 {
// 		http.Error(w, "User not found", http.StatusNotFound)
// 		return
// 	}

// 	users = append(users[:index], users[index+1:]...)
// 	w.WriteHeader(http.StatusOK)
// }
