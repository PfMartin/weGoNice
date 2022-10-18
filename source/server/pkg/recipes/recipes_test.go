package recipes

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/db"
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

func TestCreateRecipe(t *testing.T) {
	tests := []testArgs{
		{name: "all fields", recipe: testRecipeAll, expected: http.StatusCreated},
		{name: "name only", recipe: testRecipeName, expected: http.StatusCreated},
		{name: "no name", recipe: testRecipeNoName, expected: http.StatusNotAcceptable},
	}

	for _, tt := range tests {
		DB := db.Init(false)
		h := NewHandler(DB)

		tt.recipe.UserId = "23451234"

		recipe, err := json.Marshal(tt.recipe)
		if err != nil {
			t.Errorf("Failed to marshal testRecipe: %v", err)
		}

		req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(string(recipe)))
		w := httptest.NewRecorder()

		h.CreateRecipe(w, req)

		got := w.Code

		assert.Equal(t, tt.expected, got, "Test %s failed:\ntt.: %d | Got: %d", tt.name, tt.expected, got)
	}

}
