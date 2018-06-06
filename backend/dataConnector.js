const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/jemun';

console.log(connectionString);

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'SELECT * FROM Games').then(res => console.log(res));




//Dommeren løber i feltet
//Hvis der står noget i status-feltet, når der trykkes Randomizer, skal de automatisk flyttes til banken.

module.exports = {
  constructor(options) {
    this._options = options;
  },

  getParticipants(gameId) {
    if (gameId == '2') {
      return ['Nosser', 'Aallex'];
    }
    if (gameId == '4') {
      return ['Nosser', 'Aallex', 'Tennedz', 'Tarzan', 'Trusser', 'Faccio'];
    }
    if (gameId == '7') {
      return ['Nosser', 'Aallex', 'D-Kwizzle', 'Fabchup', 'Trusser', 'Faccio', 'Leffo'];
    }
  },

  getDataSets(gameId) {
    console.log(process.env.DATABASE_URL);
    if (gameId == '2') {
      return {
        labels:
          ['Goal', 'Yellow card', 'Assist', 'Corner taken', 'Yellow card', 'Assist', 'Foul committed'],
        dataSets:{
          0:[1, 3, 7, 10, 16, 29, 30], 1:[2, 2, 4, 5, 18, 18, 20]
        }
      };
    }
    if (gameId == '4') {
      return {
        labels:
          ['Goal', 'Yellow card', 'Assist'],
        dataSets:{
          0:[1, 3, 7], 1:[2, 2, 4], 2:[3, 3, 7], 3:[4, 2, 4], 4:[5, 3, 7], 5:[6, 2, 4], 6:[7, 3, 7]
        }
      };
    }
  }
}
