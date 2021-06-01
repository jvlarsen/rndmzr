import React from 'react';
import PlayerNames from './playerNames';
import Team from './teamName';
import Referee from './referee';
import './team.css';

export default class TeamBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {}
    }
  }

    render() {
        return(
          <div className="teamboxdiv">
            <div className="flex-grid">
                <div className="col leftCol">
                    <Team placeholder='Home' />
                    <PlayerNames selectedPlayer={this.props.selectedPlayer} onChange={this.props.onChange} addPlayerName={this.props.addPlayerName} team='Home'/>
                </div>
                <div className="col leftCol">
                    <Team placeholder='Away' />
                    <PlayerNames selectedPlayer={this.props.selectedPlayer} onChange={this.props.onChange} addPlayerName={this.props.addPlayerName} team='Away'/>
                </div>
            </div>
            <br />
            <div className='col centerCol'>
              <input type='checkbox' id='refereeCheckbox' onClick={this.props.toggleReferee}/>Include referee?<Referee onRefereeSelect={this.props.onRefereeSelect} refereeSelected={this.props.refereeSelected} onBlur={this.props.addPlayerName}/>
            </div>
            </div>
        );
    }
}
