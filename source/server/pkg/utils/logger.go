package utils

import (
	"net/http"

	"github.com/rs/zerolog/log"
)

type Logger struct {
}

func NewLogger() Logger {
	return Logger{}
}

// TODO: Add logging to logfile
func (l *Logger) LogEndpointHit(r *http.Request) {
	log.Info().Str("requestMethod", r.Method).Str("requestUrl", r.URL.RequestURI()).Send()
}
