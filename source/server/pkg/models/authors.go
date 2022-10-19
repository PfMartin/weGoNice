package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthorRequest struct {
	Name       string             `bson:"name"`
	WebsiteUrl string             `bson:"websiteUrl"`
	Instagram  string             `bson:"instagram"`
	YouTube    string             `bson:"youTube"`
	UserId     primitive.ObjectID `bson:"userId"`
}

type AuthorResponse struct {
	Id         string       `bson:"_id"`
	Name       string       `bson:"name"`
	WebsiteUrl string       `bson:"websiteUrl"`
	Instagram  string       `bson:"instagram"`
	YouTube    string       `bson:"youTube"`
	User       UserResponse `bson:"user"`
	CreatedAt  time.Time    `bson:"createdAt"`
	ModifiedAt time.Time    `bson:"modifiedAt"`
}

type AuthorDB struct {
	Id         string    `bson:"_id"`
	Name       string    `bson:"name"`
	WebsiteUrl string    `bson:"websiteUrl"`
	Instagram  string    `bson:"instagram"`
	YouTube    string    `bson:"youTube"`
	UserId     string    `bson:"userId"`
	CreatedAt  time.Time `bson:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}
