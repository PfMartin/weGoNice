package recipes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
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
	name           string
	recipe         models.Recipe
	expectedStatus int
	expectedRecipe models.Recipe
}

const url = "http://localhost:8080/recipes"

func TestGetAllRecipes(t *testing.T) {
	tests := []testArgs{
		{name: "gets all recipes", expectedStatus: http.StatusOK, expectedRecipe: testUtils.TestRecipeAll},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		insertedUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %s", err)
		}

		insertedAuthorID, err := testUtils.CreateTestAuthor(DB, insertedUserID)
		if err != nil {
			t.Fatalf("Author could not be created, %s", err)
		}

		insertedRecipeID, err := testUtils.CreateTestRecipe(DB, insertedUserID, insertedAuthorID)
		if err != nil {
			t.Fatalf("Recipe could not be created, %s", err)
		}

		req := httptest.NewRequest(http.MethodGet, url, nil)
		w := httptest.NewRecorder()

		context.Set(req, "userId", insertedUserID)

		h.GetAllRecipes(w, req)

		res := w.Result()
		defer res.Body.Close()
		data, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Failed to read body of response %s", err)
		}

		var recipeRes []models.Recipe
		err = json.Unmarshal(data, &recipeRes)
		if err != nil {
			t.Errorf("Failed to unmarshal response to recipes: %s", err)
		}

		tt.expectedRecipe.ID = insertedRecipeID
		tt.expectedRecipe.Author.ID = insertedAuthorID
		tt.expectedRecipe.Author.UserID = insertedUserID
		tt.expectedRecipe.User.ID = insertedUserID

		expectedRecipes := []models.Recipe{tt.expectedRecipe}

		got := recipeRes

		assert.Equal(t, expectedRecipes, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, expectedRecipes, got)
	}
}

func TestCreateRecipe(t *testing.T) {
	tests := []testArgs{
		{name: "all fields", recipe: testUtils.TestRecipeAll, expectedStatus: http.StatusCreated},
		{name: "name only", recipe: testUtils.TestRecipeName, expectedStatus: http.StatusCreated},
		{name: "no name", recipe: testUtils.TestRecipeNoName, expectedStatus: http.StatusNotAcceptable},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		if err := testUtils.ClearDatabase(DB); err != nil {
			t.Fatalf("Could not clear database")
		}

		testUserID, err := testUtils.CreateTestUser(DB)
		if err != nil {
			t.Errorf("User could not be created, %v", err)
		}

		testAuthorID, err := testUtils.CreateTestAuthor(DB, testUserID)
		if err != nil {
			t.Errorf("Author could not be created, %v", err)
		}

		newRecipe := tt.recipe
		newRecipe.UserID = testUserID
		newRecipe.AuthorID = testAuthorID

		recipe, err := json.Marshal(newRecipe)
		if err != nil {
			t.Errorf("Failed to marshal testRecipe: %v", err)
		}

		req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(recipe)))
		w := httptest.NewRecorder()

		context.Set(req, "userId", testUserID)

		h.CreateRecipe(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %d | Got: %d", tt.name, tt.expectedStatus, got)
	}
}

func TestGetRecipeByID(t *testing.T) {
	tests := []testArgs{
		{name: "get the correct recipe", expectedStatus: http.StatusOK, expectedRecipe: testUtils.TestRecipeAll},
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

		insertedRecipeID, err := testUtils.CreateTestRecipe(DB, insertedUserID, insertedAuthorID)
		if err != nil {
			t.Fatalf("Recipe could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url+"/"+insertedRecipeID, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedRecipeID})

		context.Set(req, "userId", insertedUserID)

		h.GetRecipeByID(w, req)

		res := w.Result()

		defer res.Body.Close()
		data, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Errorf("Failed to read body of response %v", err)
		}

		var recipeRes models.Recipe
		err = json.Unmarshal(data, &recipeRes)
		if err != nil {
			t.Errorf("Failed to unmarshal response to recipe: %v", err)
		}

		tt.expectedRecipe.Author.ID = insertedAuthorID
		tt.expectedRecipe.Author.UserID = insertedUserID
		tt.expectedRecipe.ID = insertedRecipeID
		tt.expectedRecipe.User.ID = insertedUserID

		got := recipeRes
		assert.Equal(t, tt.expectedRecipe, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, tt.expectedRecipe, got)
	}
}

func TestDeleteRecipeByID(t *testing.T) {
	tests := []testArgs{
		{name: "delete a recipe", expectedStatus: http.StatusOK},
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

		insertedRecipeID, err := testUtils.CreateTestRecipe(DB, insertedUserID, insertedAuthorID)
		if err != nil {
			t.Fatalf("Recipe could not be created, %v", err)
		}

		req := httptest.NewRequest(http.MethodGet, url+"/"+insertedRecipeID, nil)
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedRecipeID})

		context.Set(req, "userId", insertedUserID)

		h.DeleteRecipeByID(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, tt.expectedStatus, got)
	}
}

func TestUpdateUserByID(t *testing.T) {
	tests := []testArgs{
		{name: "updates the recipe's name", expectedStatus: http.StatusOK},
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

		insertedRecipeID, err := testUtils.CreateTestRecipe(DB, insertedUserID, insertedAuthorID)
		if err != nil {
			t.Fatalf("Recipe could not be created, %v", err)
		}

		newRecipe := testUtils.TestRecipeAll
		newRecipe.Name = "Updated Name"
		newRecipe.AuthorID = insertedAuthorID
		newRecipe.UserID = insertedUserID

		recipe, err := json.Marshal(newRecipe)

		if err != nil {
			t.Errorf("Failed to marshal recipe patch: %v", err)
		}

		req := httptest.NewRequest(http.MethodPut, url+"/"+insertedRecipeID, strings.NewReader(string(recipe)))
		w := httptest.NewRecorder()

		req = mux.SetURLVars(req, map[string]string{"id": insertedRecipeID})

		context.Set(req, "userId", insertedUserID)

		h.UpdateRecipeByID(w, req)

		got := w.Code
		assert.Equal(t, tt.expectedStatus, got, "Test %s failed:\nExpected: %v | Got: %v", tt.name, tt.expectedStatus, got)
	}
}
