# Groceries Server

### Express based REST server for serving MongoDB content using Mongoose node module

### Steps to run this code

1. Run `npm install` to install all required modules
2. Run `npm start` to start the server

### Dev Notes
#### Localhost
```
// Add Paste
curl --header "Content-Type: application/json" --request POST --data {\"content\":\"www.target.com\"} http://localhost:8101/api/paste
// Get Pastes
curl --header "Content-Type: application/json" --request GET http://localhost:8101/api/paste
// Delete Paste
curl --header "Content-Type: application/json" --request DELETE http://localhost:8101/api/paste/:id
// Update Paste
curl --header "Content-Type: application/json" --request PUT --data {\"content\":\"www.amazon.com\"} http://localhost:8101/api/paste/:id
```

#### Heroku
<https://swdv-665-paste-board.herokuapp.com/>
```
// Add Paste
curl --header "Content-Type: application/json" --request POST --data {\"content\":\"www.target.com\"} http://swdv-665-paste-board.herokuapp.com/api/paste
// Get Pastes
curl --header "Content-Type: application/json" --request GET http://swdv-665-paste-board.herokuapp.com/api/paste
// Delete Paste
curl --header "Content-Type: application/json" --request DELETE http://swdv-665-paste-board.herokuapp.com/api/paste/:id
// Update Paste
curl --header "Content-Type: application/json" --request PUT --data {\"content\":\"www.google.com\"} http://swdv-665-paste-board.herokuapp.com/api/paste/:id
```