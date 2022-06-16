package users

type User struct {
	Id        string `json:"id"`
	Lastname  string `json:"lastname"`
	Firstname string `json:"firstname"`
	Age       int    `json:"age"`
	Email     string `json:"email"`
}
