package main

import (
	"fmt"
	"net/http"

	"github.com/PfMartin/weGoNice/server/users"
	"github.com/gorilla/mux"
)

// var users = []User{}
// var idCounter int

func main() {
	r := mux.NewRouter()
	users.RegisterUserRoutes(r)

	fmt.Println("Start listening")
	fmt.Println(http.ListenAndServe(":8080", r))
}
