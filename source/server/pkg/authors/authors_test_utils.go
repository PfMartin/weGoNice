package authors

import (
	"context"
	"log"

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

var testAuthor = models.AuthorRequest{
	Name:       "Schnabularasa",
	WebsiteUrl: "https://schnabularasa.at",
	Instagram:  "testAccount",
	YouTube:    "testYouTube",
}

func CreateTestAuthor(db *mongo.Client, userID string) (string, error) {
	coll := db.Database("weGoNice").Collection("authors")

	data := bson.M{"name": testAuthor.Name, "websiteUrl": testAuthor.WebsiteUrl, "instagram": testAuthor.Instagram, "youTube": testAuthor.YouTube, "userId": userID}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Failed insert data: %v", err)
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil

}
