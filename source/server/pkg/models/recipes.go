package models

import "time"

type RecipeRequest struct {
	Name        string       `bson:"name"`
	AuthorID    string       `bson:"authorId"`
	Time        string       `bson:"time"`
	TimeUnit    string       `bson:"timeUnit"`
	Category    string       `bson:"category"`
	Ingredients []Ingredient `bson:"ingredients"`
	Steps       []Step       `bson:"steps"`
	UserID      string       `bson:"userId"`
}

type RecipeResponse struct {
	ID          string         `bson:"_id" json:"id"`
	Name        string         `bson:"name" json:"name"`
	Author      AuthorResponse `bson:"author" json:"author"`
	Time        string         `bson:"time" json:"time"`
	TimeUnit    string         `bson:"timeUnit"`
	Category    string         `bson:"category" json:"category"`
	Ingredients []Ingredient   `bson:"ingredients" json:"ingredients"`
	Steps       []Step         `bson:"steps" json:"steps"`
	User        User           `bson:"user" json:"user"`
	CreatedAt   time.Time      `bson:"createdAt" json:"createdAt"`
	ModifiedAt  time.Time      `bson:"modifiedAt" json:"modifiedAt"`
}

type RecipeDB struct {
	ID          string       `bson:"_id"`
	Name        string       `bson:"name"`
	AuthorID    string       `bson:"authorId"`
	Time        string       `bson:"time"`
	TimeUnit    string       `bson:"timeUnit"`
	Category    string       `bson:"category"`
	Ingredients []Ingredient `bson:"ingredients"`
	Steps       []Step       `bson:"steps"`
	UserID      string       `bson:"userId"`
	CreatedAt   time.Time    `bson:"createdAt"`
	ModifiedAt  time.Time    `bson:"modifiedAt"`
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
