package models

import (
	"time"
)

type AuthorRequest struct {
	Name       string `bson:"name"`
	WebsiteURL string `bson:"WebsiteURL"`
	Instagram  string `bson:"instagram"`
	YouTube    string `bson:"youTube"`
	UserID     string `bson:"userId"` // Is set by gorillaCtx retrieved from token
}

type AuthorResponse struct {
	Id         string       `bson:"_id"`
	Name       string       `bson:"name"`
	WebsiteURL string       `bson:"WebsiteURL"`
	Instagram  string       `bson:"instagram"`
	YouTube    string       `bson:"youTube"`
	User       UserResponse `bson:"user"`
	CreatedAt  time.Time    `bson:"createdAt"`
	ModifiedAt time.Time    `bson:"modifiedAt"`
}

type AuthorDB struct {
	Id         string    `bson:"_id"`
	Name       string    `bson:"name"`
	WebsiteURL string    `bson:"WebsiteURL"`
	Instagram  string    `bson:"instagram"`
	YouTube    string    `bson:"youTube"`
	UserID     string    `bson:"userId"`
	CreatedAt  time.Time `bson:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}
