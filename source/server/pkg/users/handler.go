package users

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

func NewHandler(db *gorm.DB) Handler {
	return Handler{db}
}

func (h *Handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	var users []User

	if result := h.DB.Find(&users); result.Error != nil {
		log.Fatalln(result.Error)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	var user User

	if result := h.DB.First(&user, id); result.Error != nil {
		log.Fatalln(result.Error)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var user User
	json.Unmarshal(body, &user)

	log.Println(user)

	if result := h.DB.Create(&user); result.Error != nil {
		log.Fatalln(result.Error)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Created")
}

func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var updatedUser User
	json.Unmarshal(body, &updatedUser)

	var user User

	if result := h.DB.First(&user, id); result.Error != nil {
		log.Fatalln(result.Error)
	}

	user.Lastname = updatedUser.Lastname
	user.Firstname = updatedUser.Firstname
	user.Age = updatedUser.Age
	user.Email = updatedUser.Email

	h.DB.Save(&user)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Updated")
}

func (h *Handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	var user User

	if result := h.DB.First(&user, id); result.Error != nil {
		log.Fatalln(result.Error)
	}

	h.DB.Delete(&user)

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted")
}
