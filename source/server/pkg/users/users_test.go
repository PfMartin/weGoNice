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

func TestGetUsers(t *testing.T) {
	DB := db.TestInit()
	h := NewHandler(DB)

	req := httptest.NewRequest(http.MethodGet, url, nil)
	w := httptest.NewRecorder()

	h.GetAllUsers(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Failed to get users")
	}
}

func TestPostUser(t *testing.T) {
	DB := db.TestInit()
	h := NewHandler(DB)

	data := `{"lastname": "Pfatrisch", "firstname": "Verena", "email": "verenapfatrisch@gmail.com", "password": "test"}`

	req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(data))
	w := httptest.NewRecorder()

	h.AddUser(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Failed to add user")
	}
}

func TestDeleteUser(t *testing.T) {
	DB := db.TestInit()
	h := NewHandler(DB)

	newUserString := `{"lastname": "Zarella", "firstname": "Moe", "email": "moezarella@gmail.com", "password": "test"}`

	req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(newUserString))
	w := httptest.NewRecorder()

	h.AddUser(w, req)
	if w.Code != http.StatusCreated {
		t.Errorf("Failed to add user")
	}

	req = httptest.NewRequest(http.MethodGet, url, nil)
	w = httptest.NewRecorder()

	h.GetAllUsers(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Failed to fetch users")
	}

	var users []User
	if err := json.Unmarshal(w.Body.Bytes(), &users); err != nil {
		t.Errorf("Failed to unmarshal users")
	}

	firstUserId := users[0].Id

	req = httptest.NewRequest(http.MethodDelete, url+"/"+firstUserId, nil)
	w = httptest.NewRecorder()

	req = mux.SetURLVars(req, map[string]string{"id": firstUserId})

	h.DeleteUserById(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Failed to delete user")
	}
}
