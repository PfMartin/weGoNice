package files

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/gorilla/mux"
)

func RegisterFilesRoutes(r *mux.Router, h Handler) {
	filesR := r.PathPrefix("/files").Subrouter()

	filesR.HandleFunc("", auth.CheckTokenHandler(h.SaveFile)).Methods(http.MethodPost, http.MethodGet)
}
