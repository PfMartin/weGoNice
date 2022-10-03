package users

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"

	"github.com/gorilla/mux"
)

const url = "http://localhost:8080/users"

type insertResponse struct {
	InsertedId string `bson:"InsertedID"`
}

func deleteAllUsers(t *testing.T, h Handler) {
	req := httptest.NewRequest(http.MethodPost, url, nil)
	w := httptest.NewRecorder()

	h.DeleteAllUsers(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Failed to delete all users")
	}
}

func createTestUser(t *testing.T, h Handler) (string, error) {
	newUserString := `{"lastname": "Zarella", "firstname": "Moe", "email": "moezarella@gmail.com", "password": "test"}`

	req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(newUserString))
	w := httptest.NewRecorder()

	h.AddUser(w, req)
	if w.Code != http.StatusCreated {
		t.Errorf("Failed to create user")
	}

	var res insertResponse

	if err := json.Unmarshal(w.Body.Bytes(), &res); err != nil {
		t.Errorf("Failed to unmarshal response, %v\n", err)
		return "", err
	}

	return res.InsertedId, nil
}

func TestGetUsers(t *testing.T) {
	DB := db.Init(false)
	h := NewHandler(DB)

	deleteAllUsers(t, h)
	_, err := createTestUser(t, h)
	if err != nil {
		t.Errorf("User could not be created, %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, url, nil)
	w := httptest.NewRecorder()

	h.GetAllUsers(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Failed to get users")
	}
}

// TODO: Create user and get user with the returned id, check if returned id equals inserted id

// func TestGetUserById(t *testing.T) {
// 	DB := db.Init(false)
// 	h := NewHandler(DB)

// 	deleteAllUsers(t, h)
// 	insertedUserId, err := createTestUser(t, h)
// 	if err != nil {
// 		t.Errorf("Failed to insert user, %v")
// 	}
// }

func TestPostUser(t *testing.T) {
	DB := db.Init(false)
	h := NewHandler(DB)

	deleteAllUsers(t, h)
	insertedUserId, err := createTestUser(t, h)
	if err != nil {
		t.Errorf("Failed to insert User, %v", err)
	}

	if insertedUserId == "" {
		t.Errorf("Didn't return the inserted user id")
	}
}

func TestDeleteUser(t *testing.T) {
	DB := db.Init(false)
	h := NewHandler(DB)

	deleteAllUsers(t, h)
	insertedUserId, err := createTestUser(t, h)
	if err != nil {
		t.Errorf("Failed to insert User, %v", err)
	}

	req := httptest.NewRequest(http.MethodDelete, url+"/"+insertedUserId, nil)
	w := httptest.NewRecorder()

	req = mux.SetURLVars(req, map[string]string{"id": insertedUserId})

	h.DeleteUserById(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Failed to delete user")
	}
}

func TestDeleteAllUsers(t *testing.T) {
	DB := db.Init(false)
	h := NewHandler(DB)

	deleteAllUsers(t, h)
	createTestUser(t, h)
	deleteAllUsers(t, h)

	req := httptest.NewRequest(http.MethodGet, url, nil)
	w := httptest.NewRecorder()

	h.GetAllUsers(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Failed to get all users")
	}

	var users []User
	if err := json.Unmarshal(w.Body.Bytes(), &users); err != nil {
		t.Errorf("Failed to unmarshal response, %v\n", err)
	}

	if len(users) != 0 {
		t.Errorf("Failed to delete all users")
	}
}
