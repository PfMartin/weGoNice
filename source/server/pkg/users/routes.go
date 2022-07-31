package users

import (
	"fmt"

	"net/http"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", h.GetAllUsers).Methods(http.MethodGet)
	// usersR.HandleFunc("/{id}", h.GetUser).Methods(http.MethodGet)
	usersR.HandleFunc("", h.AddUser).Methods(http.MethodPost)
	// usersR.HandleFunc("/{id}", h.UpdateUser).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", h.DeleteUserById).Methods(http.MethodDelete)

	fmt.Println("Start listening")
	fmt.Println(http.ListenAndServe(":8080", r))
}
