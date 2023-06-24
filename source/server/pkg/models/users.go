package models

import "time"

type User struct {
	ID        string `bson:"_id"`
	Lastname  string `bson:"lastName"`
	Firstname string `bson:"firstName"`
	Email     string `bson:"email"`
	Password  string `bson:"password"`
	Role      string `bson:"role"`
}

type UserDB struct {
	ID         string    `bson:"_id"`
	Lastname   string    `bson:"lastName"`
	Firstname  string    `bson:"firstName"`
	Email      string    `bson:"email"`
	Password   string    `bson:"password"`
	Role       string    `bson:"role"`
	CreatedAt  time.Time `bson:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt"`
}

type UserResponse struct {
	ID         string    `bson:"_id" json:"id"`
	Lastname   string    `bson:"lastName" json:"lastName"`
	Firstname  string    `bson:"firstName" json:"firstName"`
	Email      string    `bson:"email" json:"email"`
	Role       string    `bson:"role" json:"role"`
	CreatedAt  time.Time `bson:"createdAt" json:"createdAt"`
	ModifiedAt time.Time `bson:"modifiedAt" json:"modifiedAt"`
}
