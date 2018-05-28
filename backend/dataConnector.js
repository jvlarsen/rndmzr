
module.exports = {
  constructor(options) {
    this._options = options;
  },

  getParticipants(gameId) {
    if (gameId == '2') {
      return ['Nosser', 'Aallex'];
    }
    if (gameId == '4') {
      return ['Nosser', 'Aallex', 'Tennedz', 'Tarzan', 'Trusser', 'Faccio', 'Leffo'];
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
          ['Goal', 'Yellow card', 'Assist'],
        dataSets:{
          0:[1, 3, 7], 1:[2, 2, 4], 2:[3, 3, 7], 3:[4, 2, 4], 4:[5, 3, 7], 5:[6, 2, 4], 6:[7, 3, 7]
        }
      };
    }
  }
}