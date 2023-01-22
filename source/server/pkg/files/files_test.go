package files

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

const url = "http://localhost:8080/files"

func TestUploadImage(t *testing.T) {
	h := NewHandler()

	req := httptest.NewRequest(http.MethodGet, url, nil)
	w := httptest.NewRecorder()

	h.SaveFile(w, req)

	got := w.Code
	expectedCode := http.StatusOK

	assert.Equal(t, expectedCode, got, "Test failed:\nExpected: %d | Got: %d", expectedCode, got)
}
