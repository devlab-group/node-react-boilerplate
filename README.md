# Node + React/Redux starter kit

## What's inside

* Docker
  * nginx
  * postgresql
  * node
* ExpressJS
* React + Redux
* Sequelize

## Requirements

* Docker CE installed for [ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) or [windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker compose](https://docs.docker.com/compose/install/)

# First setup

## Client

1. Install `node_modules`:

```
$ cd client/ && yarn install
```

2. Create `/client/.env` file:

```
REACT_APP_API_HOST=<server_host> (localhost)
REACT_APP_API_PORT=<server_port> (8080)
REACT_APP_API_HTTPS=false
REACT_APP_API_BASE_PATH=/api/v1
REACT_APP_API_WITH_CREDENTIALS=true
```

## Server

1. Install `node_modules`:

```
$ cd server/ && yarn install
```

2. Create `/server/.env` file:

```
FRONT_HOSTNAME=<client_hostname> (localhost)
FRONT_PORT=<client_port> (3000)
HTTPS=false
SESSION_SECRET=<some_long_string>

POSTGRES_HOST=postgres
POSTGRES_USER=<db_user>
POSTGRES_DB=<db_name>
POSTGRES_PASSWORD=<password>

MAILGUN_API_KEY=<api-key>
MAILGUN_DOMAIN=<domain>
MAIL_FROM='"Bolierplate" <noreply@boilerplate.com>'
```

# Available commands

Commands below should be executed with `make command`.

| Command     | Description |
| ----------- | ----------- |
| run         | Runs docker in production environment |
| logs        | Prints docker logs in production |
| down        | Stops docker production |
| run-dev     | Runs docker in development environment |
| logs-dev    | Prints docker logs in development |
| down-dev    | Stops docker production |

# Bonus

The boilerplate contains ready-to-use authentication system.
