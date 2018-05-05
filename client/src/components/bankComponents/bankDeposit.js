import React from 'react';

//Her skal index være 'addBank0', 'addBank1', osv.
export default class BankDeposit extends React.Component {

  render() {
    var index = this.props.index;
    return (
      <input type='button' key={index} id={index} value='Sæt i banken' onClick={this.props.onAddBank}/>
    );
  }
}
