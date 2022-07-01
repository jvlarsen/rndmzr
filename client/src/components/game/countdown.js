import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import AppFunc from '../../helpers/appFunctions';

export default class CountdownTimer extends React.Component {
    render() {
        return(
          <Countdown id='countdown' date={Date.now() + 3600000} >
              </Countdown>);
      }
}


