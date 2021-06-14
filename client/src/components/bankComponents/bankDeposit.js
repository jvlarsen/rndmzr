import React from 'react';
import './bank.css';

//Her skal index være 'addBank0', 'addBank1', osv.
export default class BankDeposit extends React.Component {

  render() {
    var index = this.props.index;
    return (
      <input type='button' className='bigtext deposit' key={index} allocationkey={index} id={'deposit'+index} value='Bank' onClick={this.props.onAddBank}/>
    );
  }
}
