package users

import (
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", h.GetAllUsers).Methods(http.MethodGet, "OPTIONS")
	usersR.HandleFunc("/{id}", h.GetUserById).Methods(http.MethodGet, "OPTIONS")
	usersR.HandleFunc("", h.CreateUser).Methods(http.MethodPost, "OPTIONS")
	usersR.HandleFunc("/{id}", h.UpdateUserById).Methods(http.MethodPut, "OPTIONS")
	usersR.HandleFunc("/{id}", h.DeleteUserById).Methods(http.MethodDelete, "OPTIONS")
	usersR.HandleFunc("", h.DeleteAllUsers).Methods(http.MethodDelete, "OPTIONS")
}
