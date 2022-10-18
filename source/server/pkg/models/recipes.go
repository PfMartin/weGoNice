package models

import "time"

type RecipeRequest struct {
	Name        string       `bson:"name"`
	AuthorId    string       `bson:"authorId"`
	Time        string       `bson:"time"`
	Category    string       `bson:"category"`
	Ingredients []Ingredient `bson:"ingredients"`
	Steps       []Step       `bson:"steps"`
	UserId      string       `bson:"userId"`
}

type RecipeResponse struct {
	Id          string       `bson:"_id"`
	Name        string       `bson:"name"`
	Author      Author       `bson:"author"`
	Time        string       `bson:"time"`
	Category    string       `bson:"category"`
	Ingredients []Ingredient `bson:"ingredients"`
	Steps       []Step       `bson:"steps"`
	User        User         `bson:"user"`
	CreatedAt   time.Time    `bson:"created_at"`
	ModifiedAt  time.Time    `bson:"modified_at"`
}

type Ingredient struct {
	Name   string `bson:"name"`
	Amount string `bson:"amount"`
}

type Step struct {
	Name string `bson:"name"`
	Rank int    `bson:"rank"`
}
