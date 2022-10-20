package users

import (
	"context"
	"log"
	"testing"

	"github.com/PfMartin/weGoNice/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type testArgs struct {
	name     string
	userId   string
	role     string
	expected int
}

const url = "http://localhost:8080/users"

var Zarella = models.User{
	Lastname:  "Zarella",
	Firstname: "Moe",
	Password:  "testing",
	Email:     "moezarella@gmail.com",
}

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

func deleteAllUsers(t *testing.T, h Handler) error {
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	if err := coll.Drop(context.TODO()); err != nil {
		return err
	}
	return nil
}

func createTestUser(t *testing.T, h Handler) (string, error) {
	coll := h.DB.Database(h.dbName).Collection(h.collection)
	data := bson.M{"lastname": TestUser.Lastname, "firstname": TestUser.Firstname, "email": TestUser.Email, "password": TestUser.Password}
	cursor, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		log.Printf("Error: Failed insert data: %v", err)
		return "", err
	}

	userId := cursor.InsertedID.(primitive.ObjectID).Hex()

	return userId, nil
}
