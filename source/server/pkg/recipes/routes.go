package recipes

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/gorilla/mux"
)

func RegisterRecipeRoutes(r *mux.Router, h Handler) {
	usersR := r.PathPrefix("/recipes").Subrouter()

	usersR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.GetAllRecipes))).Methods(http.MethodGet)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.GetRecipeByID))).Methods(http.MethodGet)
	usersR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.CreateRecipe))).Methods(http.MethodPost)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.UpdateRecipeByID))).Methods(http.MethodPut)
	usersR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.DeleteRecipeByID))).Methods(http.MethodGet)
}
