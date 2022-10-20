package authors

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestGetAllAuthors(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expected: http.StatusOK},
		{name: "without correct userID", hasMatchingUserID: false, expected: http.StatusOK},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		err := users.DeleteAllUsers(DB)
		if err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedUserID, err := users.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		_, err = CreateTestAuthor(DB, insertedUserID)
		if err != nil {
			t.Fatalf("Author could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()

		if tt.hasMatchingUserID {
			context.Set(req, "userId", insertedUserID)
		} else {
			context.Set(req, "userId", "anything")
		}

		h.GetAllAuthors(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestGetAuthorByID(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expected: http.StatusOK},
		{name: "without correct userID", hasMatchingUserID: false, expected: http.StatusOK},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		err := users.DeleteAllUsers(DB)
		if err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedUserID, err := users.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		insertedAuthorID, err := CreateTestAuthor(DB, insertedUserID)
		if err != nil {
			t.Fatalf("Author could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url+"/"+insertedAuthorID, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedAuthorID})

		if tt.hasMatchingUserID {
			context.Set(req, "userId", insertedUserID)
		} else {
			context.Set(req, "userId", "anything")
		}

		h.GetAuthorById(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}
