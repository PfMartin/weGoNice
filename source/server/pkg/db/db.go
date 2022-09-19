package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Init() *mongo.Client {
	credentials := options.Credential{
		AuthSource: "weGoNice",
		Username:   "NiceUser",
		Password:   "nicePassword",
	}

	clientOpts := options.Client().ApplyURI("mongodb://localhost:27017").SetAuth(credentials)

	dbClient, err := mongo.Connect(context.TODO(), clientOpts)

	if err != nil {
		log.Fatalf("An error occurred while connecting to the database: %v", err)
	}

	return dbClient
}

func TestInit() *mongo.Client {
	credentials := options.Credential{
		AuthSource: "weGoNiceTest",
		Username:   "TestUser",
		Password:   "testPassword",
	}

	clientOpts := options.Client().ApplyURI("mongodb://localhost:27020").SetAuth(credentials)

	dbClient, err := mongo.Connect(context.TODO(), clientOpts)

	if err != nil {
		log.Fatalf("An error occurred while connecting to the database: %v", err)
	}

	return dbClient
}
