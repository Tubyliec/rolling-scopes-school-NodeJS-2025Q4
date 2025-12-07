# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Vulnerabilities scanning

To scan vulnerabilities

```
npm run audit
```

To fix vulnerabilities

```
npm run audit:fix
```

To force fix vulnerabilities

```
npm run audit:force
```

To scan docker images

```
npm run docker:scout
```

## Using

You can make requests with the Postman [https://www.postman.com/](https://www.postman.com/).

Use separated routes for all requests:

User

+ GET /user - get all users
+ GET /user/:id - get single user by id
+ POST /user - create user CreateUserDto
  interface CreateUserDto {
  login: string;
  password: string;
  }
+ PUT /user/:id - update user's password UpdatePasswordDto (with attributes):
  interface UpdatePasswordDto {
  oldPassword: string; // old password
  newPassword: string; // new password
  }
+ DELETE /user/:id - delete user

Track

+ GET /track - get all tracks
+ GET /track/:id - get single track by id
+ POST /track - create new track
+ PUT /track/:id - update track info
+ DELETE /track/:id - delete track

Artist

+ GET /artist - get all artists
+ GET /artist/:id - get single artist by id
+ POST /artist - create new artist
+ PUT /artist/:id - update artist info
+ DELETE /artist/:id - delete album

Album

+ GET /album - get all albums
+ GET /album/:id - get single album by id
+ POST /album - create new album
+ PUT /album/:id - update album info
+ DELETE /album/:id - delete album

Favorites

+ GET /favs - get all favorites
  Server should answer with status code 200 and all favorite records (not their ids), split by entity type:
  interface FavoritesResponse{
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  }
+ POST /favs/track/:id - add track to the favorites
+ DELETE /favs/track/:id - delete track from favorites
+ POST /favs/album/:id - add album to the favorites
+ DELETE /favs/album/:id - delete album from favorites
+ POST /favs/artist/:id - add artist to the favorites
+ DELETE /favs/artist/:id - delete artist from favorites

## Prisma

This project uses Prisma as the ORM for database management.

### Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply a new migration (development)
- `npm run prisma:migrate:deploy` - Apply pending migrations (production)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

### Database Setup

1. Create a `.env` file with the following variables:
   ```
   PORT=4000
   DATABASE_NAME=home_library
   DATABASE_HOST=localhost
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_PORT=5432
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/home_library?schema=public
   ```

2. Generate Prisma Client:
   ```
   npm run prisma:generate
   ```

3. Create and apply migrations:
   ```
   npm run prisma:migrate
   ```

## Docker

To run the app with docker use the following command:

```
docker-compose up
```

Or for development with watch mode:

```
npm run start:docker-dev
```

The Docker setup includes:
- **main** container - NestJS application
- **postgres** container - PostgreSQL database