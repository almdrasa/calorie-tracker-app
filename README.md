# Calorie Tracker Project

This is a demo react application with a small server to perform fetch requests to perform CRUD operations on in-memory data.

## Setup

- install node

- install project dependencies

```
npm install
```

- start client and server

```
npm run start
```

- To close both client and server, hit Ctrl+c

## Front-end

React based project using vite setup.

## Back-end

Small server with in-memory SQLite database that starts with random data for the past 60 days (day in / day out).

## API

- List all: http://localhost:3000/records (GET)
- List for specific date: http://localhost:3000/records?date=2000-2-28 (GET)
- Get specific record: http://localhost:3000/records/:id (GET)
- Create new record: http://localhost:3000/records (POST)
- Update existing record: http://localhost:3000/records/:id (PUT)
- Delete existing record: http://localhost:3000/records/:id (DELETE)

More details can be found in _packages/server/README.md_
