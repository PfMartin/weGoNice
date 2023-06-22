package recipes

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
	"github.com/gorilla/context"
	"github.com/stretchr/testify/assert"
)

// TODO
// func TestGetAllRecipes(t *testing.T) {
// 	DB := db.Init(false)
// 	h := NewHandler(DB)

// 	req := httptest.NewRequest(http.MethodGet, url, nil)
// 	w := httptest.NewRecorder()

// 	h.GetAllRecipes(w, req)

// 	expected := http.StatusOK
// 	got := w.Code

// 	assert.Equal(t, expected, got, "Test '%s' failed:\nExpected: %d | ", "get all", expected)
// }

const url = "http://localhost:8080/recipes"

type testArgs struct {
	name           string
	recipe         models.Recipe
	expectedStatus int
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
