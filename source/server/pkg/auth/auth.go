package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var secretKey = []byte("secret-key")

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

	// secret, err := os.Getenv("ACCESS_SECRET")
	// if err != nil {
	// 	return "", err
	// }

	secret := secretKey
	token, err := at.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return token, nil
}
