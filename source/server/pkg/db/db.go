package db

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Init(isProduction bool) *mongo.Client {
	// TODO: Change credentials and move them to an .env file
	creds := map[string]string{
		"AuthSource": os.Getenv("DATABASE_NAME"),
		"Username":   os.Getenv("DATABASE_USERNAME"),
		"Password":   os.Getenv("DATABASE_PASSWORD"),
	}

	dbURI := os.Getenv("DATABASE_URI")

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
