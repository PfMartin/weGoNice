package users

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", auth.CheckTokenHandler(h.GetAllUsers)).Methods(http.MethodGet)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(h.GetUserById)).Methods(http.MethodGet)
	usersR.HandleFunc("", auth.CheckTokenHandler(h.CreateUser)).Methods(http.MethodPost)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(h.UpdateUserById)).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(h.DeleteUserById)).Methods(http.MethodDelete)
	usersR.HandleFunc("", auth.CheckTokenHandler(h.DeleteAllUsers)).Methods(http.MethodDelete)
}
