package files

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterFilesRoutes(r *mux.Router, h Handler) {
	prefix := "/files"
	filesR := r.PathPrefix(prefix).Subrouter()

	r.PathPrefix("/").Handler(http.StripPrefix(prefix, http.FileServer(http.Dir("../files/"))))
	filesR.HandleFunc("/{id}", auth.CheckTokenHandler(h.SaveFile)).Methods(http.MethodPost)
}
