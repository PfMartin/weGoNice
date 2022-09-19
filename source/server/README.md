# Server Documentation

## Setup the Postgres database

### Start the Container

```bash
docker-compose up -d
```

### Connect to the Container

```bash
docker exec -it wegonice_db /bin/bash
```

### Connect to the database

```bash
psql --host=database --username=$POSTGRES_USER --dbname=$POSTGRES_DB
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
  -d '{"lastname": "Haberl", "firstname": "Lea", "email": "haberllea1911@gmail.com"}' \
  "http://localhost:8080/users"

# Update one
curl -X PUT \
  -H "Content-type: application/json" \
  -d '{"lastname": "Pfatrisch"} ...' \
  "http://localhost:8080/users/2"

# Delete by id
curl -X DELETE \
  -H "Content-type: application/json" \
  "http://localhost:8080/users/2"

# Delete all
curl -X DELETE \
  -H "Content-type: application/json" \
  "http://localhost:8080/users"  
```

## Resources

- API Handler and connection to Postgres Database: [dev.to - connecting-to-postgresql-using-gorm](https://dev.to/karanpratapsingh/connecting-to-postgresql-using-gorm-24fj)
- Godotenv: [golangbyexample.com - load-env-file-golang](https://golangbyexample.com/load-env-fiie-golang/)
