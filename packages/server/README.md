# Test Calorie Tracker Server

This is a simple server for performing CRUD operations for Calorie Tracker applications.

The server stores data in an in-memory SQLite DB. This means your data only persists as long as the server is up and running and will be erased when the server shuts down.

To simplify the process, the server starts with random tracking records generated for the past 60 days (one day with data and one day without).

You can add new records or change existing records as you need.

If the server is restarted, new data gets generated randomly.

## Operations / End Points

| Url                                         | method | description                                     | response                                                                                                                     | error                                                                                      |
| ------------------------------------------- | ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| http://localhost:3000/records               | GET    | Lists all records stored in DB                  | [<br> {id: 111, ...},<br> {id: 222, ...},<br> {id: 333, ...},<br> ...<br>]                                                   | 500 => Failed to fetch data                                                                |
| http://localhost:3000/records?date=2023-7-1 | GET    | Lists all records for a given date              | [<br> {id: 111, date: "2000-7-1", ...},<br> {id: 222, date: "2000-7-1", ...}, {id: 333, date: "2000-7-1", ...},<br> ...<br>] | 500 => Failed to fetch data                                                                |
| http://localhost:3000/records/111           | GET    | Returns record for a given ID                   | {<br> id: 111,<br> date: "2000-7-1",<br> meal: "Lunch",<br> content: "Rice",<br> calories: 130<br>}                          | 500 => Failed to fetch data<br>404 => Record not found                                     |
| http://localhost:3000/records               | POST   | Creates new record. record ID is auto-increment | {<br> message: "success message",<br> id: 111 // new record ID<br>}                                                          | 500 => Failed to create record<br>400 => Invalid record values                             |
| http://localhost:3000/records/111           | PUT    | Updates an existing record with a given ID      | success message                                                                                                              | 500 => Failed to update record<br>400 => Invalid record values<br>404 => Invalid record id |
| http://localhost:3000/records/111           | DELETE | Deletes an existing record with a given ID      | success message                                                                                                              | 500 => Failed to delete record<br>404 => Invalid record id                                 |
