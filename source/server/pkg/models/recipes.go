package models

type Recipe struct {
	Id          string   `bson:"_id"`
	Name        string   `bson:"name"`
	Author      string   `bson:"author"`
	Time        string   `bson:"time"`
	Category    string   `bson:"string"`
	Ingredients []string `bson:"ingredients"`
	Steps       []string `bson:"steps"`
	UserAdded   User     `bson:"userAdded"`
}
