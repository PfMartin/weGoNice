package testUtils

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var testDate = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)

func ClearDatabase(db *mongo.Client) error {
	if err := db.Database("weGoNice").Drop(context.TODO()); err != nil {
		return err
	}

	return nil
}
