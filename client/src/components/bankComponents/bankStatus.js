import React from 'react';

export default class BankStatus extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var index = this.props.index;
    return (
      <input type="text" key={index} id={index} readOnly />
    );
  }
}

//Her skal index være 'bank0', 'bank1' osv., for de respektive Participants
//MÅske vi helt kan komme af med statusfeltet, og i stedet bare opdatere de fire Withdrawal knapper
