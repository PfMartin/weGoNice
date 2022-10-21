package users

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
	hasMatchingUserId bool
	role              string
	expected          int
}

const url = "http://localhost:8080/users"

var date = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)

var TestUser = models.User{
	Lastname:  "Zarella",
	Firstname: "Moe",
	Password:  "testing",
	Email:     "moezarella@gmail.com",
}

var updateUser = models.User{
	Lastname:  "Schluepper",
	Firstname: "Rosa",
	Password:  "rosasSchluepper",
	Email:     "rosaschluepper@weg.de",
}

var testLogin = models.Login{
	Email:    TestUser.Email,
	Password: TestUser.Password,
}

func ClearDatabase(db *mongo.Client) error {
	if err := db.Database("weGoNice").Drop(context.TODO()); err != nil {
		return err
	}

	return nil
}

func CreateTestUser(db *mongo.Client) (string, error) {
	coll := db.Database("weGoNice").Collection("users")
	data := bson.M{
		"lastname":   TestUser.Lastname,
		"firstname":  TestUser.Firstname,
		"email":      TestUser.Email,
		"password":   TestUser.Password,
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
