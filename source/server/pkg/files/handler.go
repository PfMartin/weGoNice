package files

// https://gist.github.com/mattetti/5914158/f4d1393d83ebedc682a3c8e7bdc6b49670083b84
// https://tutorialedge.net/golang/go-file-upload-tutorial/

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
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

	var buf bytes.Buffer
	io.Copy(&buf, file)

	content := buf.Bytes()
	buf.Reset()

	name := strings.Split(fileHandler.Filename, ".")[0]

	fileDepot := "../../files"

	if _, err := os.Stat(fileDepot); errors.Is(err, os.ErrNotExist) {
		log.Println("Creating directory")
		if err := os.Mkdir(fileDepot, os.ModePerm); err != nil {
			log.Printf("Error while creating directory for file depot: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	filepath := fmt.Sprintf("%s/%s.png", fileDepot, name)
	err = os.WriteFile(filepath, content, 0644)
	if err != nil {
		log.Printf("Error while writing the file: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Printf("Uploaded File: %+v\n", fileHandler.Filename)
	log.Printf("File Size: %+v\n", fileHandler.Size)
	log.Printf("MIME Header: %+v\n", fileHandler.Header)

	w.WriteHeader(http.StatusOK) // TODO: FIND BETTER STATUS
}
