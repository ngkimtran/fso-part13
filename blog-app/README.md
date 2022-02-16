# Hero application

https://guarded-eyrie-43249.herokuapp.com/

## creating heroku application

heroku create

<!-- Returns an app-name for the app you just created in heroku. -->

heroku addons:create heroku-postgresql:hobby-dev -a [<app-name>]

heroku config -a [<app-name>]
=== cryptic-everglades-76708 Config Vars
DATABASE_URL: [postgres://<username>:<password>@<host-of-postgres-addon>:5432/<db-name>]

## access database with

heroku run psql -h [<host-of-postgres-addon>] -p 5432 -U [<username>] [<dbname>] -a [<app-name>]
