package main

import (
	"fmt"
	"net/http"

	"github.com/PfMartin/weGoNice/server/pkg/db"
	"github.com/PfMartin/weGoNice/server/pkg/users"
	"github.com/gorilla/mux"
)

func main() {

	DB := db.Init()
	h := users.NewHandler(DB)

	r := mux.NewRouter()
	users.RegisterUserRoutes(r, h)

	fmt.Println("Start listening")
	fmt.Println(http.ListenAndServe(":8080", r))
}
