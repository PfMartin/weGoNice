package recipes

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterRecipeRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/recipes").Subrouter()

	usersR.HandleFunc("", auth.CheckTokenHandler(h.GetAllRecipes)).Methods(http.MethodGet)
}