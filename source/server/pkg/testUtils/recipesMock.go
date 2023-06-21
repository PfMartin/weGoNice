package testUtils

import (
	"github.com/PfMartin/weGoNice/server/pkg/models"
)

var TestRecipeAll = models.RecipeRequest{
	Name:        "Test Recipe",
	AuthorID:    "Test Author ID",
	Time:        "45 min",
	Category:    "main",
	Ingredients: []models.Ingredient{{Name: "Ingredient1", Amount: "5"}, {Name: "Ingredient2", Amount: "10 ml"}, {Name: "Ingredient3", Amount: "15"}},
	Steps:       []models.Step{{Name: "Step1", Rank: 1}, {Name: "Step2", Rank: 2}, {Name: "Step3", Rank: 3}, {Name: "Step4", Rank: 4}},
}

var TestRecipeName = models.RecipeRequest{
	Name: TestRecipeAll.Name,
}

var TestRecipeNoName = models.RecipeRequest{
	AuthorID:    TestRecipeAll.AuthorID,
	Time:        TestRecipeAll.Time,
	Category:    TestRecipeAll.Time,
	Ingredients: TestRecipeAll.Ingredients,
	Steps:       TestRecipeAll.Steps,
}
