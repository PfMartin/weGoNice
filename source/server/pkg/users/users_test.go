package users

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

type testArgs struct {
	name              string
	hasMatchingUserID bool
	role              string
	expected          int
}

const url = "http://localhost:8080/users"

func TestGetAllUsers(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", role: "admin", expected: http.StatusOK},
		{name: "as test user", role: "user", expected: http.StatusUnauthorized},
		{name: "as any user", role: "user", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Fatalf("User could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()
		context.Set(req, "userId", insertedID)
		context.Set(req, "role", tt.role)

		h.GetAllUsers(w, req)

		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestGetUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", hasMatchingUserID: false, role: "admin", expected: http.StatusOK},
		{name: "as test user", hasMatchingUserID: true, role: "user", expected: http.StatusOK},
		{name: "as any user", hasMatchingUserID: false, role: "user", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedUserId, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url+"/"+insertedUserId, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		if !tt.hasMatchingUserID {
			context.Set(req, "userId", "anyId")
		} else {
			context.Set(req, "userId", insertedUserId)
		}
		context.Set(req, "role", tt.role)

		h.GetUserById(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestCreateUser(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", role: "admin", expected: http.StatusCreated},
		{name: "as test user", role: "user", expected: http.StatusUnauthorized},
		{name: "as any user", role: "user", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		userLogin, err := json.Marshal(testUtils.TestLogin)
		if err != nil {
			t.Errorf("Failed to marshal testUser: %v", err)
		}

		req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(userLogin)))
		w := httptest.NewRecorder()

		context.Set(req, "role", tt.role)

		h.CreateUser(w, req)
		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestUpdateUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", hasMatchingUserID: false, role: "admin", expected: http.StatusOK},
		{name: "as test user", hasMatchingUserID: true, role: "user", expected: http.StatusOK},
		{name: "as any user", hasMatchingUserID: false, role: "user", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedUserId, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Fatalf("Failed to insert User, %v", err)
		}

		updateUser, err := json.Marshal(testUtils.TestUser)
		if err != nil {
			t.Errorf("Failed to marshal testUser: %v", err)
		}

		req := httptest.NewRequest(http.MethodPut, url+"/"+insertedUserId, strings.NewReader(string(updateUser)))
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		if !tt.hasMatchingUserID {
			context.Set(req, "userId", "anyId")
		} else {
			context.Set(req, "userId", insertedUserId)
		}
		context.Set(req, "role", tt.role)

		h.UpdateUserById(w, req)

		got := w.Code
		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}

func TestDeleteUserById(t *testing.T) {
	tests := []testArgs{
		{name: "as wego@nice.com user", hasMatchingUserID: false, role: "admin", expected: http.StatusOK},
		{name: "as test user", hasMatchingUserID: true, role: "user", expected: http.StatusOK},
		{name: "as any user", hasMatchingUserID: false, role: "user", expected: http.StatusUnauthorized},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Failed to delete all users, %v", err)
		}

		insertedUserId, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Fatalf("Failed to insert User, %v", err)
		}

		updateUser, err := json.Marshal(testUtils.TestUser)
		if err != nil {
			t.Errorf("Failed to marshal testUser: %v", err)
		}

		req := httptest.NewRequest(http.MethodPut, url+"/"+insertedUserId, strings.NewReader(string(updateUser)))
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})
		if !tt.hasMatchingUserID {
			context.Set(req, "userId", "anyId")
		} else {
			context.Set(req, "userId", insertedUserId)
		}
		context.Set(req, "role", tt.role)

		h.DeleteUserById(w, req)
		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expected, got)
	}
}
