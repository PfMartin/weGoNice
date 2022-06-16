package users

import (
	"fmt"

	"net/http"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router) {
	usersR := r.PathPrefix("/users").Subrouter()
	usersR.Path("").Methods(http.MethodGet).HandlerFunc(getAllUsers)
	usersR.Path("").Methods(http.MethodPost).HandlerFunc(createUser)
	usersR.Path("/{id}").Methods(http.MethodGet).HandlerFunc(getUserById)
	usersR.Path("/{id}").Methods(http.MethodPut).HandlerFunc(updateUser)
	usersR.Path("/{id}").Methods(http.MethodDelete).HandlerFunc(deleteUser)

	fmt.Println("Start listening")
	fmt.Println(http.ListenAndServe(":8080", r))
}
