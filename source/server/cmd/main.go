package main

import (
	"log"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/gorilla/mux"
)

func main() {
	DB := db.Init(true)
	userHandler := users.NewHandler(DB)

	r := mux.NewRouter()
	users.RegisterUserRoutes(r, userHandler)

	url := "localhost:8080"

	log.Printf("Starting api at http://%s\n", url)
	log.Println(http.ListenAndServe(url, r))
}
