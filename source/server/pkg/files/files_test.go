package files

import (
	"bytes"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
)

const url = "http://localhost:8080/files"

func TestUploadImage(t *testing.T) {
	h := NewHandler()

	// Create path to test-image
	dir, err := os.Getwd()
	if err != nil {
		t.Errorf("Failed to get working directory: %s", err)
	}

	name := "../testUtils/test-image.png"
	path := path.Join(dir, name)

	// Open file and create multipart FormFile
	file, err := os.Open(path)
	if err != nil {
		t.Errorf("Could not open file with path '%s': %s", path, err)
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("picture", filepath.Base(file.Name()))
	if err != nil {
		t.Errorf("Failed to create FormFile from file named '%s': %s", file.Name(), err)
	}

	io.Copy(part, file)
	writer.Close()

	// Create Request
	req := httptest.NewRequest(http.MethodPost, url, body)
	req.Header.Add("Content-Type", writer.FormDataContentType())

	w := httptest.NewRecorder()

	h.SaveFile(w, req)

	got := w.Code
	expectedCode := http.StatusOK

	assert.Equal(t, expectedCode, got, "Test failed:\nExpected: %d | Got: %d", expectedCode, got)
}
