package authors

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/stretchr/testify/assert"
)

func TestGetAllAuthors(t *testing.T) {
	tests := []testArgs{
		{name: "with existing authors", hasAuthors: true, expected: http.StatusOK},
		{name: "without existing authors", hasAuthors: false, expected: http.StatusOK},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		// deleteAllAuthors(t, h)
		// if tt.hasAuthors {
		// 	_, err := createTestAuthor(t, h)
		// 	if err != nil {
		// 		t.Fatalf("Author could not be created, %v", err)
		// 	}
		// }

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()

		h.GetAllAuthors(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}
