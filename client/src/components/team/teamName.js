import React from 'react';
import './team.css';

export default class Team extends React.Component {
    render() {
        return(
            <div className='teamNames'>
                <input type="text" className="teamname" key="teamNameHome" placeholder={this.props.placeholder} />
            </div>
        );
    }
}
