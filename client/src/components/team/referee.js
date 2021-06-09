import React from 'react';

export default class Referee extends React.Component {
  render() {
    return (
      <div key='refereeRadio'>
        <input type='radio' id="refereeRadio" className='bigradio' onClick={this.props.onRefereeSelect} checked={this.props.refereeSelected}/>
        <input type='text' id='referee' placeholder='Referee name' onBlur={this.props.addRefereeName}/>
        <label className="own" id={'refereeOwn'} />||<label className="other" id={'refereeOther'} />
      </div>
    );
  }
}
