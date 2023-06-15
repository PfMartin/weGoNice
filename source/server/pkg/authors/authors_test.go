package authors

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

type testArgs struct {
	name              string
	hasMatchingUserID bool
	expectedStatus    int
	expectedAuthor    models.AuthorResponse
}

const url = "http://localhost:8080/authors"

func TestGetAllAuthors(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expectedAuthor: testUtils.ExpectedAuthor},
		{name: "without correct userID", hasMatchingUserID: false, expectedAuthor: testUtils.ExpectedAuthor},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		insertedAuthorID, err := testUtils.CreateTestAuthor(DB, insertedUserID)
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

		res := w.Result()
		defer res.Body.Close()
		data, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Failed to read body of response %v", err)
		}

		var authorRes []models.AuthorResponse
		err = json.Unmarshal(data, &authorRes)
		if err != nil {
			t.Errorf("Failed to unmarshal response to author: %v", err)
		}

		tt.expectedAuthor.ID = insertedAuthorID
		tt.expectedAuthor.User.ID = insertedUserID

		expectedAuthors := []models.AuthorResponse{tt.expectedAuthor}

		got := authorRes
		assert.Equal(t, expectedAuthors, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, expectedAuthors, got)
	}
}

func TestGetAuthorByID(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expectedAuthor: testUtils.ExpectedAuthor},
		{name: "without correct userID", hasMatchingUserID: false, expectedAuthor: testUtils.ExpectedAuthor},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		insertedAuthorID, err := testUtils.CreateTestAuthor(DB, insertedUserID)
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

		h.GetAuthorByID(w, req)

		res := w.Result()
		defer res.Body.Close()
		data, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Failed to read body of response %v", err)
		}

		var authorRes models.AuthorResponse
		err = json.Unmarshal(data, &authorRes)
		if err != nil {
			t.Errorf("Failed to unmarshal response to author: %v", err)
		}

		tt.expectedAuthor.ID = insertedAuthorID
		tt.expectedAuthor.User.ID = insertedUserID

		got := authorRes
		assert.Equal(t, tt.expectedAuthor, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, tt.expectedAuthor, got)
	}
}

func TestCreateAuthor(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expectedStatus: http.StatusCreated},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		prepareFile()

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		newAuthor := testUtils.TestAuthor
		newAuthor.UserID = insertedUserID

		author, err := json.Marshal(newAuthor)
		if err != nil {
			t.Errorf("Failed to marshal testAuthor: %v", err)
		}
		req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(author)))
		w := httptest.NewRecorder()

		if tt.hasMatchingUserID {
			context.Set(req, "userId", insertedUserID)
		} else {
			context.Set(req, "userId", "anything")
		}

		h.CreateAuthor(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expectedStatus, got)
	}

	clearTestFileDepot()
}

func TestUpdateAuthorByID(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expectedStatus: http.StatusOK},
		{name: "without correct userID", hasMatchingUserID: false, expectedStatus: http.StatusOK},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		insertedAuthorID, err := testUtils.CreateTestAuthor(DB, insertedUserID)
		if err != nil {
			t.Fatalf("Author could not be created, %v", err)
		}

		newAuthor := testUtils.UpdateAuthor
		newAuthor.UserID = insertedUserID

		author, err := json.Marshal(newAuthor)
		if err != nil {
			t.Errorf("Failed to marshal testAuthor: %v", err)
		}
		req := httptest.NewRequest(http.MethodPut, url+"/"+insertedAuthorID, strings.NewReader(string(author)))
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedAuthorID})

		context.Set(req, "userId", insertedUserID)
		h.UpdateAuthorByID(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, tt.expectedStatus, got)
	}
}

func TestDeleteAuthorByID(t *testing.T) {
	tests := []testArgs{
		{name: "with correct userID", hasMatchingUserID: true, expectedStatus: http.StatusOK},
		{name: "without correct userID", hasMatchingUserID: false, expectedStatus: http.StatusOK},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		insertedAuthorID, err := testUtils.CreateTestAuthor(DB, insertedUserID)
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

		h.DeleteAuthorByID(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expectedStatus, got)
	}
}

func prepareFile() error {
	// Copy testfile to tmp file depot
	fileName := "test-image.png"
	os.Setenv("FILE_DEPOT", "../testUtils/files/perm")
	os.Setenv("TMP_FILE_DEPOT", "../testUtils/files/tmp")

	// Create path to test-image
	dir, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("Failed to get working directory: %s", err)
	}

	filePath := fmt.Sprintf("%s/%s", "../testUtils/files", fileName)
	path := path.Join(dir, filePath)

	fmt.Printf("Prepare file: cwd: %s", path)

	fileIn, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("Could not open file in path '%s': %s", path, err)
	}
	defer fileIn.Close()

	destination := fmt.Sprintf("%s/%s", os.Getenv("TMP_FILE_DEPOT"), "testImage.png")
	fileOut, err := os.Create(destination)
	if err != nil {
		return fmt.Errorf("Could not create file destination '%s': %s", destination, err)
	}
	defer fileOut.Close()

	_, err = io.Copy(fileOut, fileIn)
	if err != nil {
		return fmt.Errorf("Could not copy file: %s", err)
	}

	return nil
}

func clearTestFileDepot() error {
	testFileDepot := os.Getenv("FILE_DEPOT")

	dir, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("Failed to get working directory: %s", err)
	}

	path := path.Join(dir, testFileDepot)

	err = os.RemoveAll(path)
	if err != nil {
		return fmt.Errorf("Failed to remove all files from Test File Depot: %s", err)
	}

	err = os.Mkdir(path, os.ModePerm)
	if err != nil {
		return fmt.Errorf("Failed to readd Test File Depot: %s", err)
	}

	return nil
}
