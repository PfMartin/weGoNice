package models

type Login struct {
	Email string `bson:"email"`
	Password string `bson:"password"`
}
