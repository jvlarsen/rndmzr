
module.exports = {
  constructor(options) {
    this._options = options;
  },

  getParticipants(gameId) {
    console.log('gameId loading in backend: ' + gameId);
    if (gameId == '4') {
      console.log('GameId was 4');
      return ['Tarzan', 'Trusser', 'Faccio', 'Leffo'];
    }

    if (gameId == '2') {
      console.log('GameId was 2');
      return ['Nosser', 'Aallex'];
    }
  }
}
