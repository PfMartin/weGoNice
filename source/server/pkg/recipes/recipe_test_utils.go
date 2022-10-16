package recipes

import (
	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/users"
)

const url = "http://localhost:8080/recipes"

type testArgs struct {
	name     string
	recipe   models.Recipe
	expected int
}

var testRecipeAll = models.Recipe{
	Name:        "Test Recipe",
	Author:      "Test Author",
	Time:        "45 min",
	Category:    "main",
	Ingredients: []string{"Ingredient1", "Ingredient2", "Ingredient3"},
	Steps:       []string{"Step1", "Step2", "Step3", "Step4"},
	UserAdded:   users.TestUser,
}

var testRecipeName = models.Recipe{
	Name: testRecipeAll.Name,
}

var testRecipeNoName = models.Recipe{
	Author:      testRecipeAll.Name,
	Time:        testRecipeAll.Author,
	Category:    testRecipeAll.Time,
	Ingredients: testRecipeAll.Ingredients,
	Steps:       testRecipeAll.Steps,
	UserAdded:   testRecipeAll.UserAdded,
}
