package authors

type testArgs struct {
	name       string
	hasAuthors bool
	expected   int
}

const url = "http://localhost:8080/authors"
