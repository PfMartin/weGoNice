package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/joho/godotenv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	loadEnvFile()

	printBanner()

	DB := db.Init(true)

	userHandler := users.NewHandler(DB)
	authHandler := auth.NewHandler(DB)

	r := mux.NewRouter()
	users.RegisterUserRoutes(r, userHandler)
	auth.RegisterAuthRoutes(r, authHandler)

	url := "localhost:8000"
	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:8080", "http://localhost", "localhost"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	log.Printf("Starting api at http://%s\n", url)
	log.Println(http.ListenAndServe(url, handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}

func loadEnvFile() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Printf(".env file not loaded. Using environment variables on machine.")
	}
}

func printBanner() {
	fmt.Print(`______________________________________________________________
                     __             _     _                   
                   /    )           /|   /     ,              
------------__----/----------__----/-| -/-----------__-----__-
 | /| /   /___)  /  --,    /   )  /  | /     /    /   '  /___)
_|/_|/___(___ __(____/____(___/__/___|/_____/____(___ __(___ _
______________________________________________________________` + "\n\n")
}
