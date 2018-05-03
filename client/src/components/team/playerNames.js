import React from 'react';

export default class PlayerNames extends React.Component {
    render() {
        const numberOfPlayers = 10;
        const selectedPlayer = (this.props.selectedPlayer) ? this.props.selectedPlayer.value : null;
        var options = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            var playerValue = this.props.team + i;
            options.push(
            <div key={playerValue}>
                <input className="bigradio" type="radio" id={'player'+playerValue+'Radio'} key={playerValue} value={playerValue} checked={selectedPlayer === playerValue} onChange={this.props.onChange}/>
                <input type="text" id={'player'+playerValue}/>
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
