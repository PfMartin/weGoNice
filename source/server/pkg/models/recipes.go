package models

import "time"

type Recipe struct {
	ID          string       `bson:"_id" json:"id"`
	Name        string       `bson:"name" json:"name"`
	AuthorID    string       `bson:"authorId" json:"authorId"`
	Author      AuthorDB     `bson:"author" json:"author"`
	TimeMinutes int          `bson:"timeMinutes" json:"timeMinutes"`
	TimeHours   int          `bson:"timeHours" json:"timeHours"`
	Category    string       `bson:"category" json:"category"`
	Ingredients []Ingredient `bson:"ingredients" json:"ingredients"`
	Steps       []Step       `bson:"steps" json:"steps"`
	ImageName   string       `bson:"imageName" json:"imageName"`
	UserID      string       `bson:"userId" json:"userId"`
	User        UserResponse `bson:"user" json:"user"`
	CreatedAt   time.Time    `bson:"createdAt" json:"createdAt"`
	ModifiedAt  time.Time    `bson:"modifiedAt" json:"modifiedAt"`
}

func (r Recipe) WithID(id string) Recipe {
	r.ID = id

	return r
}

func (r Recipe) WithTimeStamps(createdAt time.Time, modifiedAt time.Time) Recipe {
	r.CreatedAt = createdAt
	r.ModifiedAt = modifiedAt

	return r
}

type Ingredient struct {
	Rank   int    `bson:"rank" json:"rank"`
	Name   string `bson:"name" json:"name"`
	Amount int    `bson:"amount" json:"amount"`
	Unit   string `bson:"unit" json:"unit"`
}

type Step struct {
	Name string `bson:"name" json:"name"`
	Rank int    `bson:"rank" json:"rank"`
}
