import React from 'react';
import Countdown from 'react-countdown';

export default class CountdownTimer extends React.Component {
    render() {
        return(
          <Countdown id='countdown' date={Date.now() + 3600000} >
              </Countdown>);
      }
}


