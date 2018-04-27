const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

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
  res.json([{Id:1, Name:'Goal', Type:'Other3'},
                  {Id:2, Name:'Free kick committed', Type:'Own1'},
                  {Id:3, Name:'Yellow card', Type:'Own2'},
                  {Id:4, Name:'Shot on target', Type:'Other1'},
                  {Id:5, Name:'Assist', Type:'Other2'},
                  {Id:6, Name:'Medic', Type:'Own1'},
                  {Id:7, Name:'Offside', Type:'Own1'}]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
