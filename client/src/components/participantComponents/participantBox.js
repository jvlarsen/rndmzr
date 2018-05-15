import React from 'react';
import ParticipantAdder from './participantAdder';
import Participants from './participants';

export default class ParticipantBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={participantNames:[]}
  }

    render(){
        return(
            <div>
              <ParticipantAdder addParticipant={this.props.addParticipant} />
              <Participants participantNames={this.props.participantNames}/>
            </div>
        );
    }
}
