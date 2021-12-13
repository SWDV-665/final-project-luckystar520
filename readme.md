The frontend is cordova based web and android application.
Frontend run instruction:
```
cd <frontend_src directory>
npm install
// Run browser mode
ionic serve
// Run android app
ionic cordova run android --verbose
```

The backend is hosts on heroku

The backend test curl commands:
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