
module.exports = {
  constructor(options) {
    this._options = options;
  },

  getParticipants(gameId) {
    console.log('gameId loading in backend: ' + gameId);
    if (gameId == '4') {
      console.log('GameId was 4');
      return ['Nosser', 'Aallex', 'Tennedz', 'Tarzan', 'Trusser', 'Faccio', 'Leffo'];
    }

    if (gameId == '2') {
      console.log('GameId was 2');
      return ['Nosser', 'Aallex'];
    }
  },

  getDataSets(gameId) {
    console.log('DataSets being fetched for gameId: ' + gameId);
    if (gameId == '2') {
      return {
        labels:
          ['Kick-off', 'Goal', 'Yellow card', 'Assist', 'Corner taken', 'Yellow card', 'Assist', 'Foul committed'],
        dataSets:{
          0:[0, 1, 3, 7, 10, 16, 29, 30], 1:[0, 2, 2, 4, 5, 18, 18, 20]
        }
      };
    }
    if (gameId == '4') {
      return {
        labels:
          ['Kick-off', 'Goal', 'Yellow card', 'Assist'],
        dataSets:{
          0:[0, 1, 3, 7], 1:[0, 2, 2, 4]
        }
      };
    }
  }
}
