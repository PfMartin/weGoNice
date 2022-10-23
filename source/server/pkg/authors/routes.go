package authors

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterAuthorRoutes(r *mux.Router, h Handler) {
	authorsR := r.PathPrefix("/authors").Subrouter()

	authorsR.HandleFunc("", auth.CheckTokenHandler(h.GetAllAuthors)).Methods(http.MethodGet)
	authorsR.HandleFunc("/{id}", auth.CheckTokenHandler(h.GetAuthorByID)).Methods(http.MethodGet)
	authorsR.HandleFunc("", auth.CheckTokenHandler(h.CreateAuthor)).Methods(http.MethodPost)
	authorsR.HandleFunc("/{id}", auth.CheckTokenHandler(h.UpdateAuthorByID)).Methods(http.MethodPut)
	authorsR.HandleFunc("/{id}", auth.CheckTokenHandler(h.DeleteAuthorByID)).Methods(http.MethodDelete)
}
