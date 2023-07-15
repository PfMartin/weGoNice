package testUtils

import (
	"context"

	"github.com/rs/zerolog/log"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var TestRecipeAll = models.Recipe{
	Name:        "Test Recipe",
	Author:      ExpectedAuthorFlat,
	User:        ExpectedUser,
	TimeMinutes: 45,
	TimeHours:   1,
	Category:    "main",
	Ingredients: []models.Ingredient{{Rank: 1, Name: "Ingredient1", Amount: "5", Unit: "g"}, {Rank: 2, Name: "Ingredient2", Amount: "10", Unit: "ml"}, {Rank: 3, Name: "Ingredient3", Amount: "15", Unit: "l"}},
	Steps:       []models.Step{{Name: "Step1", Rank: 1}, {Name: "Step2", Rank: 2}, {Name: "Step3", Rank: 3}, {Name: "Step4", Rank: 4}},
	CreatedAt:   testDate,
	ModifiedAt:  testDate,
}

var TestRecipeName = models.Recipe{
	Name: TestRecipeAll.Name,
}

var TestRecipeNoName = models.Recipe{
	AuthorID:    TestRecipeAll.AuthorID,
	TimeMinutes: TestRecipeAll.TimeMinutes,
	TimeHours:   TestRecipeAll.TimeHours,
	Ingredients: TestRecipeAll.Ingredients,
	Steps:       TestRecipeAll.Steps,
}

func CreateTestRecipe(db *mongo.Client, userID string, authorID string) (string, error) {
	coll := db.Database("weGoNice").Collection("recipes")

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Error().Err(err).Msg("Failed to convert hex string for userID to ObjectID")
	}

	authorObjectID, err := primitive.ObjectIDFromHex(authorID)
	if err != nil {
		log.Error().Err(err).Msg("Failed to convert hex string for authorID to ObjectID")
	}

	data := bson.M{
		"name":        TestRecipeAll.Name,
		"authorId":    authorObjectID,
		"timeHours":   TestRecipeAll.TimeHours,
		"timeMinutes": TestRecipeAll.TimeMinutes,
		"category":    TestRecipeAll.Category,
		"ingredients": TestRecipeAll.Ingredients,
		"steps":       TestRecipeAll.Steps,
		"userId":      userObjectID,
		"modifiedAt":  TestRecipeAll.ModifiedAt,
		"createdAt":   TestRecipeAll.CreatedAt,
	}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Error().Err(err).Msg("Failed insert data")
		return "", err
	}

	recipeID := cursor.InsertedID.(primitive.ObjectID).Hex()

	return recipeID, nil
}
