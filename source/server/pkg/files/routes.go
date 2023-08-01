package files

import (
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/gorilla/mux"
)

func RegisterFilesRoutes(r *mux.Router, h Handler) {
	prefix := "/files"
	filesR := r.PathPrefix(prefix).Subrouter()

	filesR.HandleFunc("/{filename}", auth.CheckTokenHandler(logging.LogRequest(h.ServeFile))).Methods(http.MethodGet)
	filesR.HandleFunc("/{id}", auth.CheckTokenHandler(logging.LogRequest(h.SaveFile))).Methods(http.MethodPost)
}

func RegisterFilesRoutesTmp(r *mux.Router, h Handler) {
	prefix := "/files_tmp"
	filesR := r.PathPrefix(prefix).Subrouter()

	filesR.HandleFunc("/{filename}", auth.CheckTokenHandler(logging.LogRequest(h.ServeFileTmp))).Methods(http.MethodGet)
	filesR.HandleFunc("/{filename}", auth.CheckTokenHandler(logging.LogRequest(h.RemoveFileTmp))).Methods(http.MethodDelete)
	filesR.HandleFunc("", auth.CheckTokenHandler(logging.LogRequest(h.SaveFileTmp))).Methods(http.MethodPost)
}
