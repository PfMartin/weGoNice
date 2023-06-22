package models

import "time"

type Recipe struct {
	ID          string         `bson:"_id" json:"id"`
	Name        string         `bson:"name" json:"name"`
	AuthorID    string         `bson:"authorId" json:"authorId"`
	Author      AuthorResponse `bson:"author" json:"author"`
	Time        string         `bson:"time" json:"time"`
	TimeUnit    string         `bson:"timeUnit" json:"timeUnit"`
	Category    string         `bson:"category" json:"category"`
	Ingredients []Ingredient   `bson:"ingredients" json:"ingredients"`
	Steps       []Step         `bson:"steps" json:"steps"`
	UserID      string         `bson:"userId" json:"userId"`
	User        User           `bson:"user" json:"user"`
	CreatedAt   time.Time      `bson:"createdAt" json:"createdAt"`
	ModifiedAt  time.Time      `bson:"modifiedAt" json:"modifiedAt"`
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
	Name   string `bson:"name" json:"name"`
	Amount string `bson:"amount" json:"amount"`
	Unit   string `bson:"unit" json:"unit"`
}

type Step struct {
	Name string `bson:"name" json:"name"`
	Rank int    `bson:"rank" json:"rank"`
}
