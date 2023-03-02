package files

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
)

const url = "http://localhost:8080/files"

func TestUploadImage(t *testing.T) {
	h := NewHandler()
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Printf(".env file not loaded. Using environment variables on machine.")
	}

	// Create path to test-image
	dir, err := os.Getwd()
	if err != nil {
		t.Errorf("Failed to get working directory: %s", err)
	}

	fileName := "test-image.png"

	name := fmt.Sprintf("../testUtils/files/%s", fileName)
	path := path.Join(dir, name)

	// Open file and create multipart FormFile
	testFile, err := os.Open(path)
	if err != nil {
		t.Errorf("Could not open file with path '%s': %s", path, err)
	}
	defer testFile.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("picture", filepath.Base(testFile.Name()))
	if err != nil {
		t.Errorf("Failed to create FormFile from file named '%s': %s", testFile.Name(), err)
	}

	io.Copy(part, testFile)
	writer.Close()

	// Create Request
	authorId := "111"
	req := httptest.NewRequest(http.MethodPost, url+"/"+authorId, body)
	req.Header.Add("Content-Type", writer.FormDataContentType())
	req = mux.SetURLVars(req, map[string]string{"id": authorId})

	w := httptest.NewRecorder()

	h.SaveFile(w, req)

	got := w.Code
	expectedCode := http.StatusOK

	assert.Equal(t, expectedCode, got, "Test failed:\nExpected: %d | Got: %d", expectedCode, got)

	currentDate := time.Now().Format("2006-01-02") // Very strange formatting with go standard library
	depotDir := os.Getenv("FILE_DEPOT")

	fileNameSlice := strings.Split(fileName, ".")
	fName := fileNameSlice[0]
	fType := fileNameSlice[1]

	depotFilePath := fmt.Sprintf("%s/%s-%s-%s.%s", depotDir, currentDate, authorId, fName, fType)
	isSameFile := testUtils.CompareFileContent(depotFilePath, fmt.Sprintf("../testUtils/files/%s", fileName))
	expectIsSameFile := true

	assert.Equal(t, expectIsSameFile, isSameFile, "Test failed:\nExpected: %b | Got: %b", expectIsSameFile, isSameFile)

	if err := os.Remove(depotFilePath); err != nil {
		t.Errorf("Error while removing the test image: %s", err)
	}
}

func TestServeImage(t *testing.T) {
	fileName := "test-image.png"
	os.Setenv("FILE_DEPOT", "../../files")

	// Copy file to fileDepot

	path := fmt.Sprintf("../testUtils/files/%s", fileName)
	fileIn, err := os.Open(path)
	if err != nil {
		t.Errorf("Could not open file in path '%s': %s", path, err)
	}
	defer fileIn.Close()

	destination := fmt.Sprintf("%s/%s", os.Getenv("FILE_DEPOT"), fileName)
	fileOut, err := os.Create(destination)
	if err != nil {
		t.Errorf("Could not create file destination '%s': %s", destination, err)
	}
	defer fileOut.Close()

	_, err = io.Copy(fileOut, fileIn)
	if err != nil {
		t.Errorf("Could not copy file: %s", err)
	}

	// Test serving the file

	req := httptest.NewRequest(http.MethodGet, url+"/"+fileName, nil)
	req.Header.Add("Content-Type", "image")
	req = mux.SetURLVars(req, map[string]string{"filename": fileName})

	w := httptest.NewRecorder()

	h := NewHandler()
	h.ServeFile(w, req)

	res := w.Result()
	defer res.Body.Close()

	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		t.Errorf("Failed to read body of response %s", err)
	}

	err = os.WriteFile(fileName, data, 0644)
	if err != nil {
		t.Errorf("Failed to write file %s", err)
	}

	expectedStatus := http.StatusOK
	receivedStatus := w.Code

	assert.Equal(t, expectedStatus, receivedStatus, "Test failed:\nExpected: %b | Got: %b", expectedStatus, receivedStatus)

	isSameFile := testUtils.CompareFileContent(fmt.Sprintf("../../files/%s", fileName), fmt.Sprintf("../testUtils/files/%s", fileName))
	expectIsSameFile := true

	assert.Equal(t, expectIsSameFile, isSameFile, "Test failed:\nExpected: %b | Got: %b", expectIsSameFile, isSameFile)

	if err := os.Remove(destination); err != nil {
		t.Errorf("Error while removing the test image from file depot: %s", err)
	}

	if err := os.Remove(fileName); err != nil {
		t.Errorf("Error while removing the test image from file test dir: %s", err)
	}
}
