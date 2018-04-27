import React from 'react';

export default class Team extends React.Component {
    render() {
        return(
            <div>
                <input type="text" key="teamNameHome" placeholder={this.props.placeholder} />
            </div>
        );
    }
}
