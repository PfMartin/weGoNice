package utils

import "go.mongodb.org/mongo-driver/bson"

var UserLookup = bson.D{
	{Key: "$lookup", Value: bson.M{
		"from":         "users",
		"localField":   "userId",
		"foreignField": "_id",
		"as":           "user",
	}},
}

var AuthorLookup = bson.D{
	{Key: "$lookup", Value: bson.M{
		"from":         "authors",
		"localField":   "authorId",
		"foreignField": "_id",
		"as":           "author",
	}},
}
