package recipes

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/gorilla/mux"
)

func RegisterRecipeRoutes(r *mux.Router, h Handler) {
	recipesR := r.PathPrefix("/recipes").Subrouter()

	recipesR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.GetAllRecipes))).Methods(http.MethodGet)
	recipesR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.GetRecipeByID))).Methods(http.MethodGet)
	recipesR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.CreateRecipe))).Methods(http.MethodPost)
	recipesR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.UpdateRecipeByID))).Methods(http.MethodPut)
	recipesR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.DeleteRecipeByID))).Methods(http.MethodDelete)

	recipesR.HandleFunc("/author/{authorId}", auth.CheckTokenHandler(logging.LogRequest(h.GetRecipeByAuthorID))).Methods(http.MethodGet)
}
