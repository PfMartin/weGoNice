package testUtils

import (
	"fmt"
	"os"

	"github.com/rs/zerolog/log"
)

func Ls(path string) {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Err(err)
	}

	for _, e := range entries {
		fmt.Println(e.Name())
	}
}
