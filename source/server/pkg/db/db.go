package db

import (
	"log"
	"os"

	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	err := godotenv.Load("../pkg/db/database.env")
	if err != nil {
		log.Fatalf("Couldn't load environment file 'database.env': %s", err)
	}

	host := "localhost"
	port := "5433"
	postgresUser := os.Getenv("POSTGRES_USER")
	postgresPassword := os.Getenv("POSTGRES_PASSWORD")
	postgresDB := os.Getenv("POSTGRES_DB")

	dsn := "host=" + host + " port=" + port + " user=" + postgresUser + " password=" + postgresPassword + " dbname=" + postgresDB + " sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&users.User{})

	return db
}
