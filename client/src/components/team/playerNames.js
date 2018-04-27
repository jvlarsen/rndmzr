import React from 'react';

export default class PlayerNames extends React.Component {
    render() {
        const numberOfPlayers = 10;

        var options = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            var playerValue = this.props.team + i;
            options.push(
            <div key={playerValue}>
                <input className="bigradio" type="radio" id={'player'+playerValue} key={playerValue} value={playerValue} checked={this.props.selectedOption === playerValue} onChange={this.props.onChange}/>
                <input type="text" />
                <br/>
            </div>)
        }
        return(
            <div className='leftCol'>
                {options}
            </div>
        );
    }

    onPlayerChange(e) {
        this.setState({selectedOption:e.target.value});
    }
}
