package recipes

import (
	"github.com/PfMartin/weGoNice/server/pkg/models"
)

const url = "http://localhost:8080/recipes"

type testArgs struct {
	name     string
	recipe   models.RecipeRequest
	expected int
}

var testRecipeAll = models.RecipeRequest{
	Name:        "Test Recipe",
	AuthorID:    "Test Author ID",
	Time:        "45 min",
	Category:    "main",
	Ingredients: []models.Ingredient{{Name: "Ingredient1", Amount: "5"}, {Name: "Ingredient2", Amount: "10 ml"}, {Name: "Ingredient3", Amount: "15"}},
	Steps:       []models.Step{{Name: "Step1", Rank: 1}, {Name: "Step2", Rank: 2}, {Name: "Step3", Rank: 3}, {Name: "Step4", Rank: 4}},
}

var testRecipeName = models.RecipeRequest{
	Name: testRecipeAll.Name,
}

var testRecipeNoName = models.RecipeRequest{
	AuthorID:    testRecipeAll.AuthorID,
	Time:        testRecipeAll.Time,
	Category:    testRecipeAll.Time,
	Ingredients: testRecipeAll.Ingredients,
	Steps:       testRecipeAll.Steps,
}
