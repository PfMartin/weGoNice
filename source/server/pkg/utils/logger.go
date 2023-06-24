package utils

import (
	"log"
	"net/http"
)

type Logger struct {
}

func NewLogger() Logger {
	return Logger{}
}

// TODO: Add logging to logfile
func (l *Logger) LogEndpointHit(r *http.Request) {
	log.Printf("%s request to '%s'", r.Method, r.URL.RequestURI())
}
