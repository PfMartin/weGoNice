package auth

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(r *mux.Router, h Handler) {
	authR := r.PathPrefix("/auth").Subrouter()

	authR.HandleFunc("/login", logging.LogRequest((h.loginUser))).Methods(http.MethodPost)
	authR.HandleFunc("/register", logging.LogRequest((h.registerUser))).Methods(http.MethodPost)
	authR.HandleFunc("/token", CheckTokenHandler(logging.LogRequest((h.getTokenByToken)))).Methods(http.MethodGet)
}
