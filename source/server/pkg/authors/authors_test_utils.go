package authors

import (
	"context"
	"log"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type testArgs struct {
	name              string
	hasMatchingUserID bool
	expected          int
}

const url = "http://localhost:8080/authors"

var date = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)

var testAuthor = models.AuthorRequest{
	Name:       "Schnabularasa",
	WebsiteUrl: "https://schnabularasa.at",
	Instagram:  "testAccount",
	YouTube:    "testYouTube",
}

func CreateTestAuthor(db *mongo.Client, userID string) (string, error) {
	coll := db.Database("weGoNice").Collection("authors")

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Printf("Error: Failed to convert hex string to ObjectID, %v", err)
	}

	data := bson.M{
		"name":       testAuthor.Name,
		"websiteUrl": testAuthor.WebsiteUrl,
		"instagram":  testAuthor.Instagram,
		"youTube":    testAuthor.YouTube,
		"userId":     objectID,
		"modifiedAt": date,
		"createdAt":  date,
	}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Failed insert data: %v", err)
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil

}
