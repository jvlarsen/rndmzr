
const get = (participant, participantsGraph) => {
  var participantGraph = getParticipantGraph(participant, participantsGraph);
  console.log(participant);
  return {
    data: participantGraph.data,
    label: participant,
    borderColor: participantGraph.graphColor,
    fill: false,
    lineTension: 0,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointRadius: 1,
    pointHitRadius: 10,
  }
}

const getParticipantGraph = (participant, participantsGraph) => {
    console.log(participantsGraph);
    if (participantsGraph[participant]) {
      return participantsGraph[participant];
    }
    return {participant: {data:[]}};
}

export default {
  get,
  getParticipantGraph,
}
