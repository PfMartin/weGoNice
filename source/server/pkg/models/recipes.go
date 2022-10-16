package models

import "time"

type Recipe struct {
	Id          string    `bson:"_id"`
	Name        string    `bson:"name"`
	Author      string    `bson:"author"`
	Time        string    `bson:"time"`
	Category    string    `bson:"string"`
	Ingredients []string  `bson:"ingredients"`
	Steps       []string  `bson:"steps"`
	UserAdded   User      `bson:"userAdded"`
	CreatedAt   time.Time `bson:"created_at"`
	ModifiedAt  time.Time `bson:"modified_at"`
}
