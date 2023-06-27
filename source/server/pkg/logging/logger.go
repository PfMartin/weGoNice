package logging

import (
	"fmt"
	"net/http"
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type Logger struct {
	fileLogger zerolog.Logger
}

func NewLogger() Logger {
	logFile := os.Getenv("LOG_FILE")

	logFilePath := fmt.Sprintf("../../%s", logFile)

	file, err := os.OpenFile(
		logFilePath,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY,
		0664,
	)
	if err != nil {
		log.Fatal().Err(err).Str("logFilePath", logFilePath).Msg("Couldn't create logfile")
	}

	defer file.Close()

	logger := zerolog.New(file).With().Timestamp().Logger()

	return Logger{
		logger,
	}
}

// TODO: Add logging to logfile
func (l *Logger) LogEndpointHit(r *http.Request) {
	l.fileLogger.Info().Str("requestMethod", r.Method).Str("requestUrl", r.URL.RequestURI()).Send()
}
