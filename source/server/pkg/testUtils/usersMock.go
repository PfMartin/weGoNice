package testUtils

import (
	"context"

	"github.com/rs/zerolog/log"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var TestUser = models.User{
	LastName:  "Zarella",
	FirstName: "Moe",
	Password:  "testing",
	Email:     "moezarella@gmail.com",
}

var UpdateUser = models.User{
	LastName:  "Schluepper",
	FirstName: "Rosa",
	Password:  "rosasSchluepper",
	Email:     "rosaschluepper@weg.de",
}

var TestLogin = models.Login{
	Email:    TestUser.Email,
	Password: TestUser.Password,
}

func CreateTestUser(db *mongo.Client) (string, error) {
	coll := db.Database("weGoNice").Collection("users")
	data := bson.M{
		"lastName":   TestUser.LastName,
		"firstName":  TestUser.FirstName,
		"email":      TestUser.Email,
		"password":   TestUser.Password,
		"role":       "user",
		"modifiedAt": testDate,
		"createdAt":  testDate,
	}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Err(err).Msg("Failed insert data")
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil
}
