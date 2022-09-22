package users

import (
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", h.GetAllUsers).Methods(http.MethodGet)
	usersR.HandleFunc("/{id}", h.GetUserById).Methods(http.MethodGet)
	usersR.HandleFunc("", h.AddUser).Methods(http.MethodPost)
	usersR.HandleFunc("/{id}", h.UpdateUserById).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", h.DeleteUserById).Methods(http.MethodDelete)
	usersR.HandleFunc("", h.DeleteAllUsers).Methods(http.MethodDelete)
}
