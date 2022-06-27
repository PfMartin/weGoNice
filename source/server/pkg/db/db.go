package db

import (
	"log"

	"github.com/PfMartin/weGoNice/server/pkg/users"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	dsn := "host=localhost port=5433 user=niceUser password=nicePassword dbname=weGoNice sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&users.User{})

	return db
}
