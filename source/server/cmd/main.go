package main

import (
	"log"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/users"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	DB := db.Init(true)
	userHandler := users.NewHandler(DB)

	r := mux.NewRouter()
	users.RegisterUserRoutes(r, userHandler)

	url := "localhost:8000"
	headersOk := handlers.AllowedHeaders([]string{"Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:8080", "http://localhost", "localhost"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})


	log.Printf("Starting api at http://%s\n", url)
	log.Println(http.ListenAndServe(url, handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
