package models

import (
	"time"
)

type AuthorRequest struct {
	Name      string `bson:"name" `
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
	Website   string `bson:"website"`
	Instagram string `bson:"instagram"`
	YouTube   string `bson:"youTube"`
	ImageName string `bson:"imageName"`
	UserID    string `bson:"userId"` // Is set by gorillaCtx retrieved from token
}

type AuthorResponse struct {
	ID         string       `bson:"_id" json:"id"`
	FirstName  string       `bson:"firstName" json:"firstName"`
	LastName   string       `bson:"lastName" json:"lastName"`
	Name       string       `bson:"name" json:"name"`
	Website    string       `bson:"website" json:"website"`
	Instagram  string       `bson:"instagram" json:"instagram"`
	YouTube    string       `bson:"youTube" json:"youTube"`
	ImageName  string       `bson:"imageName" json:"imageName"`
	User       UserResponse `bson:"user" json:"user"`
	CreatedAt  time.Time    `bson:"createdAt" json:"createdAt"`
	ModifiedAt time.Time    `bson:"modifiedAt" json:"modifiedAt"`
}

type AuthorDB struct {
	ID         string    `bson:"_id" json:"id"`
	FirstName  string    `bson:"firstName" json:"firstName"`
	LastName   string    `bson:"lastName" json:"lastName"`
	Name       string    `bson:"name" json:"name"`
	Website    string    `bson:"website" json:"website"`
	Instagram  string    `bson:"instagram" json:"instagram"`
	YouTube    string    `bson:"youTube" json:"youTube"`
	UserID     string    `bson:"userId" json:"userId"`
	CreatedAt  time.Time `bson:"createdAt" json:"createdAt"`
	ImageName  string    `bson:"imageName" json:"imageName"`
	ModifiedAt time.Time `bson:"modifiedAt" json:"modifiedAt"`
}
