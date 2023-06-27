# Server Documentation

## TODOS

### Authors backend

- [ ] Use context for database queries
- [x] Tests for author handler
- [x] Use userId for authentication instead of email

## Setup the Postgres database

### Start the Container

```bash
docker-compose up -d
```

### Connect to the Container

```bash
docker exec -it weGoNice-db
```

### Connect to the database

```bash
mongo -u NiceUser -p nicePassword --authenticationDatabase weGoNice
# Type in the password from the env file
```

## API Testing with Curl

```bash
# Get all
curl -X GET \
  -H "Content-type: application/json" \
  "http://localhost:8080/users"

# Get one by id
curl -X GET \
  -H "Content-type: application/json" \
  "http://localhost:8080/users/1"

# Add one
curl -X POST \
  -H "Content-type: application/json" \
  -d '{"lastName": "Haberl", "firstName": "Lea", "email": "haberllea1911@gmail.com"}' \
  "http://localhost:8080/users"

# Update one
curl -X PUT \
  -H "Content-type: application/json" \
  -d '{"lastName": "Pfatrisch"} ...' \
  "http://localhost:8080/users/2"

# Delete by id
curl -X DELETE \
  -H "Content-type: application/json" \
  "http://localhost:8080/users/2"

# Delete all
curl -X DELETE \
  -H "Content-type: application/json" \
  "http://localhost:8080/users"

# Request with bearer token
curl -i http://localhost:8000/files -H "Authorization: Bearer mytoken"
```

## Aggregate referenced documents

```mongo
db.authors.aggregate([{
    $match: {}
  },
  {
    $lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}
  },
  {
    $project: {user: {$first: "$user"}}
  },
  {
    $unset: ["user.password"]
  }
  ])
```

## Resources

- API Handler and connection to Postgres Database: [dev.to - connecting-to-postgresql-using-gorm](https://dev.to/karanpratapsingh/connecting-to-postgresql-using-gorm-24fj)
- Godotenv: [golangbyexample.com - load-env-file-golang](https://golangbyexample.com/load-env-fiie-golang/)
