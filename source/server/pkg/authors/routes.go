package authors

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterAuthorRoutes(r *mux.Router, h Handler) {
	authorsR := r.PathPrefix("/authors").Subrouter()

	authorsR.HandleFunc("", auth.CheckTokenHandler(h.GetAllAuthors)).Methods(http.MethodGet)
	authorsR.HandleFunc("/{id}", auth.CheckTokenHandler(h.GetAuthorById)).Methods(http.MethodPost)
	authorsR.HandleFunc("", auth.CheckTokenHandler(h.CreateAuthor)).Methods(http.MethodPost)
}
