package files

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
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

	fileDepot := os.Getenv("FILE_DEPOT")

	if _, err := os.Stat(fileDepot); errors.Is(err, os.ErrNotExist) {
		log.Println("Creating directory")
		if err := os.Mkdir(fileDepot, os.ModePerm); err != nil {
			log.Printf("Error while creating directory for file depot: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	id := mux.Vars(r)["id"]
	currentDate := time.Now().Format("2006-01-02") // Very strange formatting with go standard library
	fileName := fmt.Sprintf("%s_%s_%s.png", currentDate, id, name)

	filepath := fmt.Sprintf("%s/%s", fileDepot, fileName)
	err = os.WriteFile(filepath, content, 0644)
	if err != nil {
		log.Printf("Error while writing the file: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
