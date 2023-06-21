package testUtils

import (
	"fmt"
	"log"
	"os"
)

func Ls(path string) {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	for _, e := range entries {
		fmt.Println(e.Name())
	}
}
