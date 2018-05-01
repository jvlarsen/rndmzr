import React from 'react';
import PlayerNames from './playerNames';
import Team from './teamName';
import Referee from './referee';

export default class TeamBox extends React.Component {
    render() {
        return(
          <div>
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
            <br />
            <div className='col centerCol'>
              <input type='checkbox' id='refereeCheckbox'/>Include referee?<Referee onRefereeSelect={this.props.onRefereeSelect} refereeSelected={this.props.refereeSelected}/>
            </div>
            </div>
        );
    }
}
