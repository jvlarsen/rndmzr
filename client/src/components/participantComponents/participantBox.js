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
              <div className="flex-grid">
                <ParticipantAdder addParticipant={this.props.addParticipant} />
                <input type='button' id='allocateButton' onClick={this.props.startTheGame} value='Start spillet' />
              </div>
              <Participants participants={this.props.participants} />
            </div>
        );
    }
}
