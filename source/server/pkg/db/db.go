package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Init(isProduction bool) *mongo.Client {
	// TODO: Change credentials and move them to an .env file
	creds := map[string]string{
		"AuthSource": "weGoNice",
		"Username":   "NiceUser",
		"Password":   "nicePassword",
	}

	dbURI := "mongodb://localhost:27017"

	if !isProduction {
		creds["AuthSource"] = "weGoNiceTest"
		creds["Username"] = "TestUser"
		creds["Password"] = "testPassword"

		dbURI = "mongodb://localhost:27020"
	}

	credentials := options.Credential{
		AuthSource: creds["AuthSource"],
		Username:   creds["Username"],
		Password:   creds["Password"],
	}

	clientOpts := options.Client().ApplyURI(dbURI).SetAuth(credentials)

	dbClient, err := mongo.Connect(context.TODO(), clientOpts)

	if err != nil {
		log.Fatalf("An error occurred while connecting to the database: %v", err)
	}

	return dbClient
}
