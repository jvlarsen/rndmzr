import React from 'react';
import ElementHelper from '../../helpers/elementsHelper';
import Bank from '../bankComponents/bank';
import './participants.css';

export default class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numberOfParticipants:2, participants:['Hans', 'Bob']}
  }
    render() {
      return(
        <div className='bank' id="participantsGrid">
          <ParticipantsRadio participants={this.props.participants} />
        </div>
      );
    }
}

class ParticipantsRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state={selectedOption:this.props.selectedOption}
  }

  render() {
    var participants = [];
    var onDrink = this.onDrink.bind(this);
    var participantProps = this.props.participants;

      for (var i = 0; i < Object.keys(participantProps).length; i++) {
        participants.push(
          <div className='participant' participantnumber={i} key={i}>
            <span className='participant-name'>{participantProps[i].Name}</span>
            <input type='text' className='status' key={'status'+i} id={'status'+i} numericvalue='0' ref={'status'+i} allocationkey={i} readOnly />
            <input type="button" className='cheers' key={'drink'+i} id={'drink'+i} value='Terminate!' onClick={onDrink}/>
            <Bank index={i} className="right"/>
        </div>);
    };

    return (
      <form className='leftCol'>
        {participants}
      </form>
    );
  }

  onOptionChange(e) {
    this.setState({selectedOption:e.target.value});
  }

  clearElementValue(element) {
    element.value = null;
    element.numericvalue = null;
  }

  onDrink(e) {
    var index = e.target.id.substring(5);
    var status = ElementHelper.getStatus(index);
    this.clearElementValue(status);
    status.value = '';
  }
}
