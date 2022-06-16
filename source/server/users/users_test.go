package users

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

const url = "http://localhost:8080/users"

// func TestUserCreation(t *testing.T) {
// 	resp, err := http.Get(url)

// 	if err != nil {
// 		t.Errorf("Get request to %s failed: %s", url, err)
// 	}

// 	defer resp.Body.Close()
// 	body, err := ioutil.ReadAll(resp.Body)

// 	if err != nil {
// 		t.Errorf("Reading boyd failed: %s", err)
// 	}

// 	bodyString := string(body)

// 	expected := `[]`
// 	if bodyString != expected {
// 		t.Errorf("handler returned unexpected body: got %v want %v", bodyString, expected)
// 	}
// }

// TEST DOESN'T WORK SO FAR
func TestEmptyTable(t *testing.T) {
	req, err := http.NewRequest("GET", "/users", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllUsers)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	if body := rr.Body.String(); body != "[]" {
		t.Errorf("Expected an empty array. Got %s", body)
	}
}

func TestCreateUser(t *testing.T) {

	newUser := map[string]interface{}{
		"id":        "1",
		"lastname":  "Puh",
		"firstname": "Kak",
		"age":       18,
		"email":     "k@te.st",
	}

	// TODO: Create payload from newUser map
	fmt.Println(newUser)

	// payloadString := `"id":` + newUser[|]

	payload := []byte(`{"id": "1","lastname":"Puh","firstname":"Kak","age": 18,"email":"k@te.st"}`)

	req, err := http.NewRequest("POST", "/users", bytes.NewBuffer(payload))
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

	if m["id"] != "1" {
		t.Errorf("Expected user id to be '1'. Got '%v'", m["id"])
	}

	if m["lastname"] != "Puh" {
		t.Errorf("Expected user lastname to be 'Puh'. Got '%v'", m["lastname"])
	}

	if m["firstname"] != "Kak" {
		t.Errorf("Expected user firstname to be 'Kak'. Got '%v'", m["firstname"])
	}

	if m["age"] != 18.0 {
		t.Errorf("Expected user age to be '18'. Got '%v'", m["age"])
	}

	if m["email"] != "k@te.st" {
		t.Errorf("Expected user email to be 'k@te.st'. Got '%v'", m["email"])
	}
}
