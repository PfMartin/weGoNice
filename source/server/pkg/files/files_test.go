package files

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"path/filepath"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
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
	depotDir := os.Getenv("FILE_DEPOT")
	depotFilePath := fmt.Sprintf("%s/%s", depotDir, fileName)

	name := fmt.Sprintf("../testUtils/%s", fileName)
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
	req := httptest.NewRequest(http.MethodPost, url, body)
	req.Header.Add("Content-Type", writer.FormDataContentType())

	w := httptest.NewRecorder()

	h.SaveFile(w, req)

	got := w.Code
	expectedCode := http.StatusOK

	assert.Equal(t, expectedCode, got, "Test failed:\nExpected: %d | Got: %d", expectedCode, got)

	isSameFile := testUtils.CompareFileContent(depotFilePath, fmt.Sprintf("testDir/%s", fileName))
	expectIsSameFile := true

	assert.Equal(t, expectIsSameFile, isSameFile, "Test failed:\nExpected: %b | Got: %b", expectIsSameFile, isSameFile)

	if err := os.Remove(depotFilePath); err != nil {
		t.Errorf("Error while removing the test image: %s", err)
	}
}
