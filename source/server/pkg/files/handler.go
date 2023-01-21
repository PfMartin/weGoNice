package files

import (
	"fmt"
	"net/http"
)

type Handler struct {
}

func NewHandler() Handler {
	return Handler{}
}

func (h *Handler) SaveFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("File Upload Endpoint Hit")

	r.ParseMultipartForm(10 << 20)

	file, handler, err := r.FormFile("picture")
	if err != nil {
		fmt.Printf("Error Retrieving the File %s", err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	w.WriteHeader(http.StatusOK) // FIND BETTER STATUS
}
