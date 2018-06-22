import React from 'react';
import './game.css';
import AppFunc from '../../helpers/appFunctions';

export default class Undo extends React.Component {

  render() {


    return(
      <input type='button' className='undo' onClick={this.undoLatest} value='Undo' />
    );
  }

  undoLatest = () => {
    AppFunc.undoLatest();
  }
}
