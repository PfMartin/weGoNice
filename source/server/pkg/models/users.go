package models

import "time"

type User struct {
	ID        string `bson:"_id"`
	Lastname  string `bson:"lastname"`
	Firstname string `bson:"firstname"`
	Email     string `bson:"email"`
	Password  string `bson:"password"`
	Role      string `bson:"role"`
}

type UserDB struct {
	ID         string    `bson:"_id"`
	Lastname   string    `bson:"lastname"`
	Firstname  string    `bson:"firstname"`
	Email      string    `bson:"email"`
	Password   string    `bson:"password"`
	Role       string    `bson:"role"`
	CreatedAt  time.Time `bson:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}

type UserResponse struct {
	ID         string    `bson:"_id"`
	Lastname   string    `bson:"lastname"`
	Firstname  string    `bson:"firstname"`
	Email      string    `bson:"email"`
	Role       string    `bson:"role"`
	CreatedAt  time.Time `bson:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}
