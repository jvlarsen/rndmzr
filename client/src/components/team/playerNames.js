import React from 'react';
import './team.css';

export default class PlayerNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {}
    }
  }

    render() {
        const selectedPlayer = (this.props.selectedPlayer) ? this.props.selectedPlayer.value : null;
        var options = [];
        for (var i = 0; i < 10; i++) {
            var playerValue = this.props.team + i;
            options.push(
            <div key={playerValue} className="playername">
                <input className="bigradio" type="radio" id={'player'+playerValue+'Radio'} key={playerValue} value={playerValue} checked={selectedPlayer === playerValue} onChange={this.props.onChange}/>
                <input type="text" id={'player'+playerValue} onBlur={this.props.addPlayerName}/>
                <label className="own" id={'player'+playerValue+'Own'} /> - <label className="other" id={'player'+playerValue+'Other'} />
                <br/>
            </div>)
        }
        return(
            <div className='leftCol'>
                {options}
            </div>
        );
    }
}
