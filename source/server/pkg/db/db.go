package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Init(isProduction bool) *mongo.Client {
	creds := map[string]string{
		"AuthSource": os.Getenv("DATABASE_NAME"),
		"Username":   os.Getenv("DATABASE_USERNAME"),
		"Password":   os.Getenv("DATABASE_PASSWORD"),
	}

	dbURI := os.Getenv("DATABASE_URI")

	if !isProduction {
		creds["AuthSource"] = "weGoNice"
		creds["Username"] = "TestUser"
		creds["Password"] = "testPassword"

		dbURI = os.Getenv("TEST_DB_URI")

		if dbURI == "" {
			dbURI = "mongodb://localhost:27020"
		}
	}

	credentials := options.Credential{
		AuthSource: creds["AuthSource"],
		Username:   creds["Username"],
		Password:   creds["Password"],
	}

	clientOpts := options.Client().ApplyURI(dbURI).SetAuth(credentials)

	ctx, _ := context.WithTimeout(context.Background(), time.Second*10)
	dbClient, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatalf("An error occurred while connecting to the database: %v", err)
	}

	if err = dbClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatalf("Failed to ping mongo db service: %v", err)
	}

	log.Println("Connected to database")
	return dbClient
}
