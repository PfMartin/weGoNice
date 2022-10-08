package users

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestGetAllUsers(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusOK},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusUnauthorized},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)
		_, err := createTestUser(t, h)
		if err != nil {
			t.Fatalf("User could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()
		context.Set(req, "email", tt.email)

		h.GetAllUsers(w, req)

		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestGetUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusOK},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusOK},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)
		insertedUserId, err := createTestUser(t, h)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url+"/"+insertedUserId, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		context.Set(req, "email", tt.email)

		h.GetUserById(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestPostUser(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusCreated},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusUnauthorized},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)

		userLogin, err := json.Marshal(testLogin)
		if err != nil {
			t.Errorf("Failed to marshal testUser: %v", err)
		}

		req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(userLogin)))
		w := httptest.NewRecorder()

		context.Set(req, "email", tt.email)

		h.CreateUser(w, req)
		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestUpdateUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusOK},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusOK},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)

		insertedUserId, err := createTestUser(t, h)
		if err != nil {
			t.Fatalf("Failed to insert User, %v", err)
		}

		updateUser, err := json.Marshal(testUser)
		if err != nil {
			t.Errorf("Failed to marshal testUser: %v", err)
		}

		req := httptest.NewRequest(http.MethodPut, url+"/"+insertedUserId, strings.NewReader(string(updateUser)))
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		context.Set(req, "email", tt.email)

		h.UpdateUserById(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestDeleteUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusOK},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusOK},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)
		insertedUserId, err := createTestUser(t, h)
		if err != nil {
			t.Fatalf("Failed to insert User, %v", err)
		}

		req := httptest.NewRequest(http.MethodDelete, url+"/"+insertedUserId, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		context.Set(req, "email", tt.email)

		h.DeleteUserById(w, req)
		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestDeleteAllUsers(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", email: "wego@nice.com", expected: http.StatusOK},
		{name: "as test user", email: "moezarella@gmail.com", expected: http.StatusUnauthorized},
		{name: "as any user", email: "test@test.de", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {

		DB := db.Init(false)
		h := NewHandler(DB)

		deleteAllUsers(t, h)
		createTestUser(t, h)

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()

		context.Set(req, "email", tt.email)
		h.DeleteAllUsers(w, req)

		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}
