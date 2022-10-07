package models

type Login struct {
	Email string `bson:"_id"`
	Password string `bson:"password"`
}
