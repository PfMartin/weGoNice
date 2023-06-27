package testUtils

import (
	"context"

	"github.com/rs/zerolog/log"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var TestAuthor = models.AuthorRequest{
	Name:      "Schnabularasa",
	FirstName: "Jelena",
	LastName:  "Schnabu",
	Website:   "https://schnabularasa.at",
	Instagram: "testAccount",
	YouTube:   "testYouTube",
	ImageName: "testImage.png",
}

var UpdateAuthor = models.AuthorRequest{
	Name:      "Nico Rittenau",
	FirstName: "Nico",
	LastName:  "Rittenau",
	Website:   "https://www.nikorittenau.com/",
	Instagram: "rittenau",
	YouTube:   "rittenau",
	ImageName: "testImage.png",
}

var ExpectedUser = models.UserResponse{
	ID:         "willChange",
	LastName:   TestUser.LastName,
	FirstName:  TestUser.FirstName,
	Email:      TestUser.Email,
	Role:       "user",
	CreatedAt:  testDate,
	ModifiedAt: testDate,
}

var ExpectedAuthor = models.AuthorResponse{
	ID:         "willChange",
	Name:       TestAuthor.Name,
	LastName:   TestAuthor.LastName,
	FirstName:  TestAuthor.FirstName,
	Website:    TestAuthor.Website,
	Instagram:  TestAuthor.Instagram,
	YouTube:    TestAuthor.YouTube,
	ImageName:  TestAuthor.ImageName,
	CreatedAt:  testDate,
	ModifiedAt: testDate,
	User:       ExpectedUser,
}

var ExpectedAuthorFlat = models.AuthorDB{
	ID:         ExpectedAuthor.ID,
	Name:       TestAuthor.Name,
	LastName:   TestAuthor.LastName,
	FirstName:  TestAuthor.FirstName,
	Website:    TestAuthor.Website,
	Instagram:  TestAuthor.Instagram,
	YouTube:    TestAuthor.YouTube,
	ImageName:  TestAuthor.ImageName,
	CreatedAt:  testDate,
	ModifiedAt: testDate,
	UserID:     "will change",
}

func CreateTestAuthor(db *mongo.Client, userID string) (string, error) {
	coll := db.Database("weGoNice").Collection("authors")

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Error().Err(err).Msg("Failed to convert hex string to ObjectID")
	}

	data := bson.M{
		"name":       TestAuthor.Name,
		"lastName":   TestAuthor.LastName,
		"firstName":  TestAuthor.FirstName,
		"website":    TestAuthor.Website,
		"instagram":  TestAuthor.Instagram,
		"youTube":    TestAuthor.YouTube,
		"imageName":  TestAuthor.ImageName,
		"userId":     objectID,
		"modifiedAt": testDate,
		"createdAt":  testDate,
	}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Error().Err(err).Msg("Failed insert data")
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil
}
