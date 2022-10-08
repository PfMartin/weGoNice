package users

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler, checkTokenHandler auth.CheckTokenHandlerFunc) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", checkTokenHandler(h.GetAllUsers)).Methods(http.MethodGet)
	usersR.HandleFunc("/{id}", checkTokenHandler(h.GetUserById)).Methods(http.MethodGet)
	usersR.HandleFunc("", checkTokenHandler(h.CreateUser)).Methods(http.MethodPost)
	usersR.HandleFunc("/{id}", checkTokenHandler(h.UpdateUserById)).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", checkTokenHandler(h.DeleteUserById)).Methods(http.MethodDelete)
	usersR.HandleFunc("", checkTokenHandler(h.DeleteAllUsers)).Methods(http.MethodDelete)
}
