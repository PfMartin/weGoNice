package files

import (
	"bufio"
	"bytes"
	"compress/gzip"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/gorilla/mux"
)

type Handler struct {
	logger zerolog.Logger
}

func NewHandler() Handler {
	logger := logging.Get()

	return Handler{
		logger,
	}
}

func (h *Handler) SaveFile(w http.ResponseWriter, r *http.Request) {
	h.saveFile(w, r, false)
}

func (h *Handler) ServeFile(w http.ResponseWriter, r *http.Request) {
	h.serveFile(w, r, false)
}

func (h *Handler) SaveFileTmp(w http.ResponseWriter, r *http.Request) {
	h.saveFile(w, r, true)
}

func (h *Handler) ServeFileTmp(w http.ResponseWriter, r *http.Request) {
	h.serveFile(w, r, true)
}

func (h *Handler) RemoveFileTmp(w http.ResponseWriter, r *http.Request) {
	fileDepot := os.Getenv("TMP_FILE_DEPOT")
	filename := mux.Vars(r)["filename"]

	filePath := fmt.Sprintf("%s/%s", fileDepot, filename)

	if err := os.Remove(filePath); err != nil {
		h.logger.Error().Err(err).Str("filePath", filePath).Msgf("Failed to delete image with path %s", filePath)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) saveFile(w http.ResponseWriter, r *http.Request, isTemporary bool) {
	r.ParseMultipartForm(10 << 20)

	file, fileHandler, err := r.FormFile("picture")
	if err != nil {
		log.Error().Err(err).Msg("Failed to retrieve the File")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer file.Close()

	var buf bytes.Buffer
	io.Copy(&buf, file)

	content := buf.Bytes()
	buf.Reset()

	name := strings.Split(fileHandler.Filename, ".")

	if err := validateFileExtension(name[1]); err != nil {
		h.logger.Error().Err(err).Send()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	nameString := name[0]
	fileType := strings.ToLower(name[1])

	fileDepot := os.Getenv("TMP_FILE_DEPOT")
	fileName := nameString
	if !isTemporary {
		fileDepot = os.Getenv("FILE_DEPOT")
		id := mux.Vars(r)["id"]
		currentDate := time.Now().Format("2006-01-02") // Very strange formatting with go standard library
		fileName = fmt.Sprintf("%s-%s-%s", currentDate, id, nameString)
	}

	fileNameWithExt := fmt.Sprintf("%s.%s", fileName, fileType)

	if _, err := os.Stat(fileDepot); errors.Is(err, os.ErrNotExist) {
		h.logger.Error().Err(err).Str("directory", fileDepot).Msg("Directory doesn't exist. Creating directory")
		if err := os.Mkdir(fileDepot, os.ModePerm); err != nil {
			h.logger.Error().Err(err).Msg("Error while creating directory for file depot")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	filepath := fmt.Sprintf("%s/%s", fileDepot, fileNameWithExt)

	err = os.WriteFile(filepath, content, 0644)
	if err != nil {
		h.logger.Error().Err(err).Msg("Error while writing the file")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	gzipFilepath := fmt.Sprintf("%s/%s.gz", fileDepot, fileNameWithExt)
	err = gzipFile(filepath, gzipFilepath)
	if err != nil {
		h.logger.Error().Err(err).Msg("Error while gzipping the file")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) serveFile(w http.ResponseWriter, r *http.Request, isTemporary bool) {
	fileDepot := os.Getenv("TMP_FILE_DEPOT")

	if !isTemporary {
		fileDepot = os.Getenv("FILE_DEPOT")
	}
	filename := mux.Vars(r)["filename"]
	filePath := fmt.Sprintf("%s/%s", fileDepot, filename)

	archivePath := fmt.Sprintf("%s.gz", filePath)

	file, err := os.Open(archivePath)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to open file")
		http.Error(w, "Failed to open file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to read stats of file")
		http.Error(w, "Failed to read stats of file", http.StatusInternalServerError)
		return
	}
	size := fileInfo.Size()
	bytes := make([]byte, size)

	buffer := bufio.NewReader(file)
	_, err = buffer.Read(bytes)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to read bytes to buffer")
		http.Error(w, "Failed to read bytes to buffer", http.StatusInternalServerError)
		return
	}

	filetype := http.DetectContentType(bytes)

	w.Header().Add("Content-Type", filetype)
	w.WriteHeader(http.StatusOK)
	w.Write(bytes)
}

func (h *Handler) MoveTmpFileToPerm(tmpFilePath string, filePath string, isWithDelete bool) error {
	errMsg := "Failed to update author with new imageName"

	tmpFile, err := os.Open(tmpFilePath)
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to open temporary file during file copy")
		return fmt.Errorf("%s: %s", errMsg, err)
	}

	permFile, err := os.Create(filePath)
	if err != nil {
		tmpFile.Close()
		return fmt.Errorf("%s: %s", errMsg, err)
	}
	defer permFile.Close()

	_, err = io.Copy(permFile, tmpFile)
	tmpFile.Close()
	if err != nil {
		h.logger.Error().Err(err).Msg("Failed to copy temporary file to file")
		return fmt.Errorf("%s: %s", errMsg, err)
	}

	if isWithDelete {
		err = os.Remove(tmpFilePath)
		if err != nil {
			h.logger.Error().Err(err).Msg("Failed to remove temp file")
			return fmt.Errorf("%s: %s", errMsg, err)
		}
	}

	return nil
}

func validateFileExtension(fileExtension string) error {
	lowerExtension := strings.ToLower(fileExtension)
	possibleExtensions := []string{"jpg", "png"}

	if lowerExtension != possibleExtensions[0] && lowerExtension != possibleExtensions[1] {
		return fmt.Errorf("image must be '.%s' or '.%s'", possibleExtensions[0], possibleExtensions[1])
	}

	return nil
}

func gzipFile(sourcePath string, targetPath string) error {
	sourceFile, err := os.Open(sourcePath)
	if err != nil {
		return err
	}
	defer sourceFile.Close()

	targetFile, err := os.Create(targetPath)
	if err != nil {
		return err
	}
	defer targetFile.Close()

	archiver := gzip.NewWriter(targetFile)
	defer archiver.Close()

	_, err = io.Copy(archiver, sourceFile)
	if err != nil {
		return err
	}

	err = os.Remove(sourcePath)
	return err
}
