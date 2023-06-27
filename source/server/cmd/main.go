package main

import (
	"fmt"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/auth"
	"github.com/PfMartin/weGoNice/server/pkg/authors"
	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/files"
	"github.com/PfMartin/weGoNice/server/pkg/logging"
	"github.com/PfMartin/weGoNice/server/pkg/recipes"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/joho/godotenv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	loadEnvFile()
	printBanner()

	DB := db.Init(true)

	logger := logging.Get()

	userHandler := users.NewHandler(DB)
	authHandler := auth.NewHandler(DB)
	recipeHandler := recipes.NewHandler(DB)
	authorHandler := authors.NewHandler(DB)
	filesHandler := files.NewHandler()

	r := mux.NewRouter()
	users.RegisterUserRoutes(r, userHandler)
	auth.RegisterAuthRoutes(r, authHandler)
	recipes.RegisterRecipeRoutes(r, recipeHandler)
	authors.RegisterAuthorRoutes(r, authorHandler)
	files.RegisterFilesRoutes(r, filesHandler)
	files.RegisterFilesRoutesTmp(r, filesHandler)

	url := "localhost:8000"
	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:8080", "http://localhost", "localhost"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	logger.Info().Str("url", url).Msg("Starting api")
	logger.Fatal().Err(http.ListenAndServe(url, handlers.CORS(originsOk, headersOk, methodsOk)(r))).Send()
}

func loadEnvFile() {
	err := godotenv.Load("../.env")
	logger := logging.Get()
	if err != nil {
		logger.Error().Msg(".env file not loaded. Using environment variables on machine.")
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
