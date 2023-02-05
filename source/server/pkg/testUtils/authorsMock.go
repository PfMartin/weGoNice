package testUtils

import (
	"context"
	"log"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var TestAuthor = models.AuthorRequest{
	Name:      "Schnabularasa",
	Firstname: "Jelena",
	Lastname:  "Schnabu",
	Website:   "https://schnabularasa.at",
	Instagram: "testAccount",
	YouTube:   "testYouTube",
	ImageName: "2023-02-05_anyID_testImage.png",
}

var UpdateAuthor = models.AuthorRequest{
	Name:      "Nico Rittenau",
	Firstname: "Nico",
	Lastname:  "Rittenau",
	Website:   "https://www.nikorittenau.com/",
	Instagram: "rittenau",
	YouTube:   "rittenau",
	ImageName: "2023-02-05_anyID_testImage.png",
}

var ExpectedUser = models.UserResponse{
	ID:         "willChange",
	Lastname:   TestUser.Lastname,
	Firstname:  TestUser.Firstname,
	Email:      TestUser.Email,
	Role:       "user",
	CreatedAt:  testDate,
	ModifiedAt: testDate,
}

var ExpectedAuthor = models.AuthorResponse{
	ID:         "willChange",
	Name:       TestAuthor.Name,
	Lastname:   TestAuthor.Lastname,
	Firstname:  TestAuthor.Firstname,
	Website:    TestAuthor.Website,
	Instagram:  TestAuthor.Instagram,
	YouTube:    TestAuthor.YouTube,
	ImageName:  TestAuthor.ImageName,
	CreatedAt:  testDate,
	ModifiedAt: testDate,
	User:       ExpectedUser,
}

func CreateTestAuthor(db *mongo.Client, userID string) (string, error) {
	coll := db.Database("weGoNice").Collection("authors")

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Printf("Error: Failed to convert hex string to ObjectID, %v", err)
	}

	data := bson.M{
		"name":       TestAuthor.Name,
		"lastname":   TestAuthor.Lastname,
		"firstname":  TestAuthor.Firstname,
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
		log.Printf("Error: Failed insert data: %v", err)
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil

}
