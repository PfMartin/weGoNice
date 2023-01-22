package files

// https://gist.github.com/mattetti/5914158/f4d1393d83ebedc682a3c8e7bdc6b49670083b84
// https://tutorialedge.net/golang/go-file-upload-tutorial/

import (
	"log"
	"net/http"
)

type Handler struct {
}

func NewHandler() Handler {
	return Handler{}
}

func (h *Handler) SaveFile(w http.ResponseWriter, r *http.Request) {
	log.Println("File Upload Endpoint Hit")

	r.ParseMultipartForm(10 << 20)

	file, fileHandler, err := r.FormFile("picture")
	if err != nil {
		log.Printf("Error Retrieving the File %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer file.Close()
	log.Printf("Uploaded File: %+v\n", fileHandler.Filename)
	log.Printf("File Size: %+v\n", fileHandler.Size)
	log.Printf("MIME Header: %+v\n", fileHandler.Header)

	w.WriteHeader(http.StatusOK) // FIND BETTER STATUS
}
