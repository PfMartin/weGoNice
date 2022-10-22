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
	Name:       "Schnabularasa",
	WebsiteUrl: "https://schnabularasa.at",
	Instagram:  "testAccount",
	YouTube:    "testYouTube",
}

var ExpectedUser = models.UserResponse{
	Id:         "willChange",
	Lastname:   TestUser.Lastname,
	Firstname:  TestUser.Firstname,
	Email:      TestUser.Email,
	Role:       "user",
	CreatedAt:  testDate,
	ModifiedAt: testDate,
}

var ExpectedAuthor = models.AuthorResponse{
	Id:         "willChange",
	Name:       TestAuthor.Name,
	WebsiteUrl: TestAuthor.WebsiteUrl,
	Instagram:  TestAuthor.Instagram,
	YouTube:    TestAuthor.YouTube,
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
		"websiteUrl": TestAuthor.WebsiteUrl,
		"instagram":  TestAuthor.Instagram,
		"youTube":    TestAuthor.YouTube,
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
