package users

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
)

func TestGetUsers(t *testing.T) {
	DB := db.Init()
	h := NewHandler(DB)

	req := httptest.NewRequest(http.MethodGet, "http://localhost:8080/users", nil)
	w := httptest.NewRecorder()

	h.GetAllUsers(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Users could not be fetched")
	}
}

func TestPostUser(t *testing.T) {
	DB := db.Init()
	h := NewHandler(DB)

	data := `{"lastname": "Pfatrisch", "firstname": "Verena", "email": "verenapfatrisch@gmail.com", "password": "test"}`

	req := httptest.NewRequest(http.MethodPost, "http://localhost:8080/users", strings.NewReader(data))
	w := httptest.NewRecorder()

	h.AddUser(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("User could not be added")
	}
}
