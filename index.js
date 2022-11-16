const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const app = express();

//const DataConnector = require('./backend/dataConnector');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;
  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/api/events', (req, res) => {
  res.json([      {Id:1, Name:'Mål!!!', RefereeName:'Spiller bolden', Type:'Other3'},
                  {Id:2, Name:'Assist', RefereeName:'Kalder spiller hen', Type:'Other2'},
                  {Id:3, Name:'Skud på mål', RefereeName:'Spray (1/situation)', Type:'Other1'},
                  {Id:4, Name:'Tager hjørne', RefereeName:'Publikum spotter kamera', Type:'Other1'},
                  {Id:5, Name:'Medic!', RefereeName:'Målspark i feltet', Type:'Own1'},
                  {Id:6, Name:'Offside', RefereeName:'VARevognen', Type:'Own1'},
                  {Id:7, Name:'Frispark begået', RefereeName:'Dommerkast', Type:'Own1'},
                  {Id:8, Name:'Skud udenfor mål', RefereeName:'Udskiftning 1. halvleg', Type:'Own1'},
                  {Id:11, Name:'Udskiftet', RefereeName:'5. udskiftning', Type:'Own1'},
                  {Id:9, Name:'Straffe begået', RefereeName:'VARcheck sidelinje', Type:'Own2'},
                  {Id:10, Name:'Gult kort', RefereeName:'Taber ting', Type:'Own2'},
                  {Id:12, Name:'Selvmål', RefereeName:'Ramt af bold/spiller', Type:'Own3'},
                  {Id:13, Name:'Brændt straffe', RefereeName:'Falder', Type:'Own3'},
                  {Id:14, Name:'Rødt kort', RefereeName:'Udskiftes', Type:'Own3'},
                  {Id:15, Name:'Worst Worm Egen (rød)', RefereeName:'Worst Worm Egen (rød)', Type:'Other1'},
                  {Id:16, Name:'Best Worm Andre (grøn)', RefereeName:'Best Worm Andre (grøn)', Type:'Own1'},]);
});

/* Commenting out to remove "require". I am not using the load game functionality anyway.
app.get('/api/games/gameId/participants', (req, res) => {
  var loadedParticipants = DataConnector.getParticipants(req.query['gameId']);
  res.json(loadedParticipants);
});

app.get('/api/games/gameId/dataSets', (req, res) => {
  var loadedDataSets = DataConnector.getDataSets(req.query['gameId']);
  res.json(loadedDataSets);
})

app.get('/api/games/gameId', (req, res) => {
  var gameData = [];
  var loadedDataSets = DataConnector.getDataSets(req.query['gameId']);
  var loadedParticipants = DataConnector.getParticipants(req.query['gameId']);
  gameData.push(loadedDataSets);
  gameData.push(loadedParticipants);
  res.json(gameData);
})
*/

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Randomizer backend running on ${port}`);
