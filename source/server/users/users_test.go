package users

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

const url = "/users"

var testUser = map[string]interface{}{
	"id":        "1",
	"lastname":  "Puh",
	"firstname": "Kak",
	"age":       float64(18), // Needs to be float64 (json.Unmarshal converts any number to float64)
	"email":     "k@te.st",
}

func TestEmptyTable(t *testing.T) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllUsers)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	want := "[]"

	if body := rr.Body.String(); strings.Trim(body, "\n") != want {
		t.Errorf("Got: %s, Want: %s", body, want)
	}
}

func TestCreateUser(t *testing.T) {
	payload, err := json.Marshal(testUser)

	if err != nil {
		t.Fatal(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createUser)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusCreated {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusCreated)
	}

	var m map[string]interface{}
	json.Unmarshal(rr.Body.Bytes(), &m)

	for key, val := range testUser {

		if m[key] != val {
			t.Errorf("Expected user %s to be '%v'. Got '%v' instead. %T, %T", key, val, m[key], val, m[key])
		}
	}
}
