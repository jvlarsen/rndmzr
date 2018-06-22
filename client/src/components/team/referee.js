import React from 'react';

export default class Referee extends React.Component {
  render() {
    return (
      <div key='refereeRadio'>
        <input type='radio' id="refereeNameRadio" className='bigradio' onClick={this.props.onRefereeSelect} checked={this.props.refereeSelected}/>
        <input type='text' id='refereeName' placeholder='Referee name' />
        <label className="own" id={'refereeStatOwn'} />||<label className="other" id={'refereeStatOther'} />
      </div>
    );
  }
}
