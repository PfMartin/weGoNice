package users

import "golang.org/x/crypto/bcrypt"

type User struct {
	Id        string `bson:"_id"`
	Lastname  string `bson:"lastname"`
	Firstname string `bson:"firstname"`
	Email     string `bson:"email"`
	Password  string `bson:"password"`
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}

	user.Password = string(bytes)
	return nil
}

func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}
