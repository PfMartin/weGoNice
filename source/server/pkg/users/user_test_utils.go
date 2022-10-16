package users

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/gorilla/context"
)

type testArgs struct {
	name     string
	email    string
	role     string
	expected int
}

const url = "http://localhost:8080/users"

var TestUser = models.User{
	Lastname:  "Zarella",
	Firstname: "Moe",
	Password:  "testing",
	Email:     "moezarella@gmail.com",
}

var updateUser = models.User{
	Lastname:  "Schluepper",
	Firstname: "Rosa",
	Password:  "rosasSchluepper",
	Email:     "rosaschluepper@weg.de",
}

var testLogin = models.Login{
	Email:    TestUser.Email,
	Password: TestUser.Password,
}

func deleteAllUsers(t *testing.T, h Handler) {
	req := httptest.NewRequest(http.MethodPost, url, nil)
	w := httptest.NewRecorder()

	context.Set(req, "email", "wego@nice.com")
	context.Set(req, "role", "admin")

	h.DeleteAllUsers(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("Failed to delete all users")
	}
}

func createTestUser(t *testing.T, h Handler) (string, error) {
	userLogin, err := json.Marshal(testLogin)
	if err != nil {
		t.Errorf("Failed to marshal TestUser")
	}

	req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(userLogin)))
	w := httptest.NewRecorder()

	context.Set(req, "email", "wego@nice.com")
	context.Set(req, "role", "admin")

	h.CreateUser(w, req)
	if w.Code != http.StatusCreated {
		t.Errorf("Failed to create user")
	}

	var res string

	if err := json.Unmarshal(w.Body.Bytes(), &res); err != nil {
		t.Fatalf("Failed to unmarshal response, %v\n", err)
		return "", err
	}

	return res, nil
}
