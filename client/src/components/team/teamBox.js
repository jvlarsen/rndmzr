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
                <div className="narrow">
                    <Team id="hometeamname" placeholder='Hjemmehold' addTeamName={this.props.addTeamName}/>
                    <PlayerNames selectedPlayer={this.props.selectedPlayer} onChange={this.props.onChange} addPlayerName={this.props.addPlayerName} team='Home'/>
                </div>
                <div className="narrow">
                    <Team id="awayteamname" placeholder='Udehold' addTeamName={this.props.addTeamName}/>
                    <PlayerNames selectedPlayer={this.props.selectedPlayer} onChange={this.props.onChange} addPlayerName={this.props.addPlayerName} team='Away'/>
                </div>
            </div>
            <br />
            <div className="narrow referee">
              <input type='checkbox' id='refereeCheckbox' onClick={this.props.toggleReferee}/>Er dommeren med?<Referee onRefereeSelect={this.props.onRefereeSelect} refereeSelected={this.props.refereeSelected} addRefereeName={this.props.addPlayerName}/>
            </div>
          </div>
        );
    }
}
