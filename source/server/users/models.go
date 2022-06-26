package users

import "gorm.io/gorm"

type User struct {
	Id        int    `json:"id" gorm:"primaryKey"`
	Lastname  string `json:"lastname"`
	Firstname string `json:"firstname"`
	Age       int    `json:"age"`
	Email     string `json:"email"`
}

var db *gorm.DB
var err error
