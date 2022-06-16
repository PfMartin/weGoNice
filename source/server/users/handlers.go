package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

var users = []User{}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(users); err != nil {
		fmt.Println(err)
		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
	}
}

func createUser(w http.ResponseWriter, r *http.Request) {
	u := User{}

	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		fmt.Println(err)
		http.Error(w, "Error decoding response object", http.StatusBadRequest)
		return
	}

	users = append(users, u)

	response, err := json.Marshal(&u)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(response)
}

func indexById(users []User, id string) int {
	for i := 0; i < len(users); i++ {
		if users[i].Id == id {
			return i
		}
	}

	return -1
}

func getUserById(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	index := indexById(users, id)

	if index < 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users[index]); err != nil {
		fmt.Println(err)
		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
	}
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	index := indexById(users, id)
	if index < 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	u := User{}
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		fmt.Println(err)
		http.Error(w, "Error decoding response object", http.StatusBadRequest)
		return
	}

	users[index] = u

	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(&u); err != nil {
		fmt.Println(err)
		http.Error(w, "Error encoding response object", http.StatusInternalServerError)
	}
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	index := indexById(users, id)
	if index < 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	users = append(users[:index], users[index+1:]...)
	w.WriteHeader(http.StatusOK)
}
