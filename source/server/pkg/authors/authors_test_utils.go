package authors

import (
	"context"
	"log"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type testArgs struct {
	name              string
	hasMatchingUserID bool
	expectedStatus    int
	expectedAuthor    models.AuthorResponse
}

const url = "http://localhost:8080/authors"

var date = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)

var testAuthor = models.AuthorRequest{
	Name:       "Schnabularasa",
	WebsiteUrl: "https://schnabularasa.at",
	Instagram:  "testAccount",
	YouTube:    "testYouTube",
}

var expectedUser = models.UserResponse{
	Id:         "willChange",
	Lastname:   users.TestUser.Lastname,
	Firstname:  users.TestUser.Firstname,
	Email:      users.TestUser.Email,
	Role:       "user",
	CreatedAt:  date,
	ModifiedAt: date,
}

var expectedAuthor = models.AuthorResponse{
	Id:         "willChange",
	Name:       testAuthor.Name,
	WebsiteUrl: testAuthor.WebsiteUrl,
	Instagram:  testAuthor.Instagram,
	YouTube:    testAuthor.YouTube,
	CreatedAt:  date,
	ModifiedAt: date,
	User:       expectedUser,
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
