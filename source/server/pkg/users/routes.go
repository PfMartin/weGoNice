package users

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/users").Subrouter()

	usersR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.GetAllUsers))).Methods(http.MethodGet)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.GetUserById))).Methods(http.MethodGet)
	usersR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.CreateUser))).Methods(http.MethodPost)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.UpdateUserById))).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.DeleteUserById))).Methods(http.MethodDelete)
}
