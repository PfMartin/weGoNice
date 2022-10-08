package auth

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/context"
	"golang.org/x/crypto/bcrypt"
)

type CheckTokenHandlerFunc =  func(http.HandlerFunc) http.HandlerFunc

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

func createToken(email string) (string, error) {
	var err error

	atClaims := jwt.MapClaims{}
	atClaims["autorized"] = true
	atClaims["email"] = email
	atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

	fmt.Println(os.Getenv("ACCESS_SECRET"))

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

func IsEmailContextOk(email string, r *http.Request) bool {
	emailCtx, ok := context.Get(r, "email").(string)
	if !ok {
		return false
	}
	if emailCtx != email && emailCtx != "admin" {
		return false
	}
	return true
}

func IsAdminContextOk(r *http.Request) bool {
	emailCtx, ok := context.Get(r, "email").(string)
	if !ok {
		return false
	}
	if emailCtx != "admin" {
		return false
	}
	return true
}

func CheckTokenHandler(next http.HandlerFunc) http.HandlerFunc{
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
			email, ok := claims["email"].(string)
			if !ok {
				http.Error(w, "Unautorized", http.StatusUnauthorized)
				return
			}

			// check if user with email exists
			// Set email in the request, so I will use it in check after
			context.Set(r, "email", email)
		}
		next(w, r)

	}
}

func checkToken(tokenString string) (*jwt.Token, bool) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token)(interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("ACCESS_SECRET")),nil
	})

	if err != nil {
		return nil, false
	}

	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return nil, false
	}

	return token, true
}
