# Setup the Postgres database

## Start the Container

```bash
docker-compose up -d
```

## Connect to the Container

```bash
docker exec -it wegonice_db /bin/bash
```

## Connect to the database

```bash
psql --host=database --username=$POSTGRES_USER --dbname=$POSTGRES_DB
# Type in the password from the env file
```
