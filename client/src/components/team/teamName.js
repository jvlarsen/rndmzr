import React from 'react';
import './team.css';

export default class Team extends React.Component {
    render() {
        return(
            <div>
                <input id={this.props.id} type="text" className="teamname" key="teamNameHome" placeholder={this.props.placeholder} onBlur={this.props.addTeamName}/>
            </div>
        );
    }
}
