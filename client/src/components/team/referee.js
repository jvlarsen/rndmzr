import React from 'react';

export default class Referee extends React.Component {
  render() {
    return (
      <div key='refereeRadio'>
        <input type='radio' className='bigradio' onClick={this.props.onRefereeSelect} checked={this.props.refereeSelected}/>
        <input type='text' id='refereeName' placeholder='Referee name' />
      </div>
    );
  }
}
