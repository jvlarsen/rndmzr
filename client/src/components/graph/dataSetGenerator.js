const getDataSet = (participantIndex, time, measure, currLabels, currDataSet) => {
  var firstDataSet = getFirstDataSet();

  var data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '90+'],
    datasets: [
      {
        data: firstDataSet,
        label: 'Participant 1',
        fill: false,
        lineTension: 0,
        borderColor: 'rgba(75,192,192,1)',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointRadius: 1,
        pointHitRadius: 10,
      },
      {
        data: [0, 20, 20, 20, 40, 42, 48],
        label: 'Participant 2',
        fill: false,
        lineTension: 0,
        borderColor: 'rgba(150,100,100,1)',
        pointHoverBackgroundColor: 'rgba(150,100,100,1)',
        pointRadius: 1,
        pointHitRadius: 10,
      }
    ]
  };

  return data;
};

const getFirstDataSet = () => {
  var data = [0, 5, 7, 14, 21, 25, 34];
  return data;
}

//I stedet skal der skrives et database-kald, der henter alle datapunkter og mapper dem ud i hver sit dataSet.
//Ved ikke hvordan labels skal opdateres.

export default {
  getDataSet,
}


/*Et data-objekt til grafen, har forment
{labels: x,
 datasets: {
   data: [0, 20, 20, 20, 40, 42, 48, 55, 62, 75],
   label: 'Participant 2',
   fill: false,
   lineTension: 0,
   borderColor: 'rgba(150,100,100,1)',
   pointHoverBackgroundColor: 'rgba(150,100,100,1)',
   pointRadius: 1,
   pointHitRadius: 10,
}}
*/
