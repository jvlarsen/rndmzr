const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const app = express();

const DataConnector = require('./backend/dataConnector');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;
  console.log(count);
  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/api/events', (req, res) => {
  res.json([      {Id:1, Name:'Goal!!!', RefereeName:'Ball in but not approved', Type:'Other3'},
                  {Id:2, Name:'Assist', RefereeName:'Separates players', Type:'Other2'},
                  {Id:3, Name:'Shot on target', RefereeName:'1H 3+ min ET', Type:'Other1'},
                  {Id:4, Name:'Corner taken', RefereeName:'Talk, no card', Type:'Other1'},
                  {Id:5, Name:'Medic!', RefereeName:'1H 2- min ET', Type:'Own1'},
                  {Id:6, Name:'Offside', RefereeName:'2H 5+', Type:'Own1'},
                  {Id:7, Name:'Foul committed', RefereeName:'Dictates placing of ball', Type:'Own1'},
                  {Id:8, Name:'Shot off target', RefereeName:'2H 0-2min ET', Type:'Own1'},
                  {Id:9, Name:'Penalty committed', RefereeName:'2H 3-4min ET', Type:'Own2'},
                  {Id:10, Name:'Yellow card', RefereeName:'Uses spray', Type:'Own2'},
                  {Id:11, Name:'Substituted', RefereeName:'Hit by ball', Type:'Own2'},
                  {Id:12, Name:'Own goal', RefereeName:'Consults other referees', Type:'Own3'},
                  {Id:13, Name:'Penalty missed', RefereeName:'Falls', Type:'Own3'},
                  {Id:14, Name:'Red card', RefereeName:'Injured', Type:'Own3'}]);
});

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


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Randomizer backend running on ${port}`);
