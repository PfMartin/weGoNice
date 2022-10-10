package auth

import (
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(r *mux.Router, h Handler) {
	authR := r.PathPrefix("/auth").Subrouter()

	authR.HandleFunc("/login", h.loginUser).Methods(http.MethodPost)
	authR.HandleFunc("/register", h.registerUser).Methods(http.MethodPost)
	authR.HandleFunc("/token", CheckTokenHandler(h.getTokenByToken)).Methods(http.MethodGet)
}
