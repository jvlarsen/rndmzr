//const pg = require('pg');
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/jemun';

//console.log(connectionString);

//const client = new pg.Client(connectionString);
//client.connect();
//const query = client.query(
  //'SELECT * FROM Games').then(res => console.log(res));




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
      return {0: {'Name':'Nosser', 'AllocationKey':0}, 1: {'Name':'Aallex', 'AllocationKey':1}, 2: {'Name':'Tarzan', 'AllocationKey':2}, 3: {'Name':'Faccio', 'AllocationKey':3}, 4: {'Name':'Tennedz', 'AllocationKey':4}, 5: {'Name':'Trusser', 'AllocationKey':5}, 6: {'Name':'Leffo', 'AllocationKey':6}};
    }
    if (gameId == '7') {
      return ['Nosser', 'Aallex', 'D-Kwizzle', 'Fabchup', 'Trusser', 'Tarzan', 'Leffo'];
    }
  },

  getDataSets(gameId) {
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
          ['Goal', 'Yellow card', 'Assist', 'Medic'],
        dataSets:{
          0:[0, 2, 7, 3], 
          1:[2, 0, 4, 5], 
          2:[3, 3, 7, 2], 
          3:[4, 0, 4, 1], 
          4:[5, 0, 0, 0], 
          5:[6, 0, 4, 5], 
          6:[7, 0, 7, 2]
        }
      };
    }
  }
}
