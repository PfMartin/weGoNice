package files

import (
	"bufio"
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
	saveFile(w, r, false)
}

func (h *Handler) ServeFile(w http.ResponseWriter, r *http.Request) {
	serveFile(w, r, false)
}

func (h *Handler) SaveFileTmp(w http.ResponseWriter, r *http.Request) {
	saveFile(w, r, true)
}

func (h *Handler) ServeFileTmp(w http.ResponseWriter, r *http.Request) {
	serveFile(w, r, true)
}

func saveFile(w http.ResponseWriter, r *http.Request, isTemporary bool) {
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

	name := strings.Split(fileHandler.Filename, ".")
	nameString := name[0]
	fileType := strings.ToLower(name[1])

	fileDepot := os.Getenv("TMP_FILE_DEPOT")
	fileName := fmt.Sprintf("%s.%s", nameString, fileType)
	if !isTemporary {
		fileDepot = os.Getenv("FILE_DEPOT")
		id := mux.Vars(r)["id"]
		currentDate := time.Now().Format("2006-01-02") // Very strange formatting with go standard library
		fileName = fmt.Sprintf("%s-%s-%s.%s", currentDate, id, nameString, fileType)
	}

	if _, err := os.Stat(fileDepot); errors.Is(err, os.ErrNotExist) {
		log.Printf("Directory '%s' doesn't existing. Creating directory", fileDepot)
		if err := os.Mkdir(fileDepot, os.ModePerm); err != nil {
			log.Printf("Error while creating directory for file depot: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	filepath := fmt.Sprintf("%s/%s", fileDepot, fileName)

	// TODO: Compress file before writing it to os

	err = os.WriteFile(filepath, content, 0644)
	if err != nil {
		log.Printf("Error while writing the file: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func serveFile(w http.ResponseWriter, r *http.Request, isTemporary bool) {
	fileDepot := os.Getenv("TMP_FILE_DEPOT")

	if !isTemporary {
		fileDepot = os.Getenv("FILE_DEPOT")
	}
	filename := mux.Vars(r)["filename"]

	filePath := fmt.Sprintf("%s/%s", fileDepot, filename)

	// TODO: Decompress file before writing it to os

	file, err := os.Open(filePath)
	if err != nil {
		log.Printf("Error: Failed to open file: %v", err)
		http.Error(w, "Failed to open file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		log.Printf("Error: Failed to read stats of file: %v", err)
		http.Error(w, "Failed to read stats of file", http.StatusInternalServerError)
		return
	}
	size := fileInfo.Size()
	bytes := make([]byte, size)

	buffer := bufio.NewReader(file)
	_, err = buffer.Read(bytes)
	if err != nil {
		log.Printf("Error: Failed to read bytes to buffer: %v", err)
		http.Error(w, "Failed to read bytes to buffer", http.StatusInternalServerError)
		return
	}

	filetype := http.DetectContentType(bytes)

	w.Header().Add("Content-Type", filetype)
	w.WriteHeader(http.StatusOK)
	w.Write(bytes)
}
