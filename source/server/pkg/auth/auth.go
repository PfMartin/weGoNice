package auth

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog/log"

	"github.com/dgrijalva/jwt-go"
	gorillaCtx "github.com/gorilla/context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func checkPassword(password string, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func createToken(id string, isAdmin bool) (string, error) {
	var err error

	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["userId"] = id
	if isAdmin {
		atClaims["role"] = "admin"
	} else {
		atClaims["role"] = "user"
	}
	atClaims["exp"] = time.Now().Add(time.Hour * 2).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

	secret := os.Getenv("ACCESS_SECRET")
	if err != nil {
		return "", err
	}

	token, err := at.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return token, nil
}

func IsUserIdContextOk(id string, r *http.Request) bool {
	userIdCtx, ok := gorillaCtx.Get(r, "userId").(string)
	if !ok {
		return false
	}
	if userIdCtx != id {
		return false
	}
	return true
}

func IsAdminContextOk(r *http.Request) bool {
	roleCtx, ok := gorillaCtx.Get(r, "role").(string)
	if !ok {
		return false
	}
	if roleCtx != "admin" {
		return false
	}
	return true
}

func CheckTokenHandler(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get("Authorization")
		bearerToken := strings.Split(header, " ")
		if len(bearerToken) != 2 {
			http.Error(w, "Cannot read token", http.StatusBadRequest)
			return
		}
		if bearerToken[0] != "Bearer" {
			http.Error(w, "Error in authorization token. It needs to be in form of 'Bearer <token>'", http.StatusBadRequest)
			return
		}
		token, ok := checkToken(bearerToken[1])
		if !ok {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if ok && token.Valid {
			id, ok := claims["userId"].(string)
			if !ok {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				log.Info().Str("id", id).Msg("Check token Handler Unauthorized")
				return
			}

			role, ok := claims["role"].(string)
			if !ok {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			// Set email in the request, so I will use it in check after
			gorillaCtx.Set(r, "userId", id)
			gorillaCtx.Set(r, "role", role)
		}

		next(w, r)

	}
}

func checkToken(tokenString string) (*jwt.Token, bool) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})

	if err != nil {
		return nil, false
	}

	if _, ok := token.Claims.(jwt.MapClaims); !ok && !token.Valid {
		return nil, false
	}

	return token, true
}

func GetUserIDFromCtx(r *http.Request) (primitive.ObjectID, error) {
	userIDCtx, ok := gorillaCtx.Get(r, "userId").(string)
	if !ok {
		userID, _ := primitive.ObjectIDFromHex("123")
		return userID, errors.New("failed to retrieve userId from token")
	}

	userID, err := primitive.ObjectIDFromHex(userIDCtx)
	if err != nil {
		userID, _ := primitive.ObjectIDFromHex("123")
		return userID, errors.New("failed to parse id to ObjectID")
	}

	return userID, nil
}
