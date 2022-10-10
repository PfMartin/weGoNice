package models

type User struct {
	Id        string `bson:"_id"`
	Lastname  string `bson:"lastname"`
	Firstname string `bson:"firstname"`
	Email     string `bson:"email"`
	Password  string `bson:"password"`
	Role      string `bson:"role"`
}
