package testUtils

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var testDate = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)
var updateDate = time.Date(2020, time.May, 12, 10, 0, 0, 0, time.UTC)

var collections = []string{"users", "authors"}

func ClearDatabase(db *mongo.Client) error {
	var err error

	for _, collection := range collections {
		if err = db.Database("weGoNice").Collection(collection).Drop(context.TODO()); err != nil {
			return err
		}
	}

	return nil
}
