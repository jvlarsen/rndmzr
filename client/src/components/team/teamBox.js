import React from 'react';
import PlayerNames from './playerNames';
import Team from './teamName';

export default class TeamBox extends React.Component {
    render() {
        return(
            <div className="flex-grid">
                <div className="col leftCol">
                    <Team placeholder='Home' />
                    <PlayerNames selectedOption={this.props.selectedPlayer} onChange={this.props.onChange} team='Home'/>
                </div>
                <div className="col leftCol">
                    <Team placeholder='Away' />
                    <PlayerNames selectedOption={this.props.selectedPlayer} onChange={this.props.onChange} team='Away'/>
                </div>
            </div>
        );
    }
}
