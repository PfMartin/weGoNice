package main

import (
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"

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

	logger := logging.NewLogger()

	userHandler := users.NewHandler(DB, logger)
	authHandler := auth.NewHandler(DB, logger)
	recipeHandler := recipes.NewHandler(DB, logger)
	authorHandler := authors.NewHandler(DB, logger)
	filesHandler := files.NewHandler(logger)

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

	log.Info().Str("url", url).Msg("Starting api")
	log.Error().Err(http.ListenAndServe(url, handlers.CORS(originsOk, headersOk, methodsOk)(r))).Send()
}

func loadEnvFile() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Error().Msg(".env file not loaded. Using environment variables on machine.")
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
