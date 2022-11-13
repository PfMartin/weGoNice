package models

import (
	"time"
)

type AuthorRequest struct {
	Name      string `bson:"name" `
	Firstname string `bson:"firstname"`
	Lastname  string `bson:"lastname"`
	Website   string `bson:"website"`
	Instagram string `bson:"instagram"`
	YouTube   string `bson:"youTube"`
	ImageURL  string `bson:"imageUrl"`
	UserID    string `bson:"userId"` // Is set by gorillaCtx retrieved from token
}

type AuthorResponse struct {
	ID         string       `bson:"_id" json:"id"`
	Firstname  string       `bson:"firstname" json:"firstname"`
	Lastname   string       `bson:"lastname" json:"lastname"`
	Name       string       `bson:"name" json:"name"`
	Website    string       `bson:"website" json:"website"`
	Instagram  string       `bson:"instagram" json:"instagram"`
	YouTube    string       `bson:"youTube" json:"youTube"`
	ImageURL   string       `bson:"imageUrl" json:"imageUrl"`
	User       UserResponse `bson:"user" json:"user"`
	CreatedAt  time.Time    `bson:"createdAt" json:"createdAt"`
	ModifiedAt time.Time    `bson:"modifiedAt" json:"modifiedAt"`
}

type AuthorDB struct {
	ID         string    `bson:"_id"`
	Firstname  string    `bson:"firstname"`
	Lastname   string    `bson:"lastname"`
	Name       string    `bson:"name"`
	Website    string    `bson:"website"`
	Instagram  string    `bson:"instagram"`
	YouTube    string    `bson:"youTube"`
	UserID     string    `bson:"userId"`
	CreatedAt  time.Time `bson:"createdAt"`
	ImageURL   string    `bson:"imageUrl"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}
