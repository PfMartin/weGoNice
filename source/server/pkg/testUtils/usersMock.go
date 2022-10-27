package testUtils

import (
	"context"
	"log"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var TestUser = models.User{
	Lastname:  "Zarella",
	Firstname: "Moe",
	Password:  "testing",
	Email:     "moezarella@gmail.com",
}

var UpdateUser = models.User{
	Lastname:  "Schluepper",
	Firstname: "Rosa",
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
		"lastname":   TestUser.Lastname,
		"firstname":  TestUser.Firstname,
		"email":      TestUser.Email,
		"password":   TestUser.Password,
		"role":       "user",
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