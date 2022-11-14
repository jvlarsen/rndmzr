
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
        },
        players:
          {
            "playerHome0":{"Name":"sc","AllocationKey":"0"},
            "playerHome1":{"Name":"kjhg","AllocationKey":"1"},
            "playerHome2":{"Name":"yt","AllocationKey":"2"},
            "playerHome3":{"Name":",mnlo","AllocationKey":"3"},
            "playerHome4":{"Name":"tyvv","AllocationKey":"4"},
            "playerHome5":{"Name":"08","AllocationKey":"0"},
            "playerHome6":{"Name":",mnkj","AllocationKey":"2"},
            "playerHome7":{"Name":"5487","AllocationKey":"0"},
            "playerHome8":{"Name":"369","AllocationKey":"0"},
            "playerHome9":{"Name":"964","AllocationKey":"2"},
            "playerAway0":{"Name":"876g","AllocationKey":"6"},
            "playerAway1":{"Name":"876n","AllocationKey":"3"},
            "playerAway2":{"Name":"09o","AllocationKey":"1"},
            "playerAway3":{"Name":"vrtf4","AllocationKey":"1"},
            "playerAway4":{"Name":"bjh09","AllocationKey":"0"},
            "playerAway5":{"Name":".,mnyg ","AllocationKey":"2"},
            "playerAway6":{"Name":" ljoh9","AllocationKey":"1"},
            "playerAway7":{"Name":"hlh","AllocationKey":"1"},
            "playerAway8":{"Name":"'klkj","AllocationKey":"0"},
            "playerAway9":{"Name":"h97y","AllocationKey":"3"}}
      };
    }
  }
}
