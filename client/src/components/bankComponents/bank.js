import React from 'react';
import Deposit from './bankDeposit';
import Withdrawal from './bankWithdrawal';


//Deposit skal have en onAddBank() sendt som props.
export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'counters':{'Small':0, 'Medium':0, 'Large':0, 'Walter':0}};
  }

  render() {
    return (
      <span className="bankGroup">
        <Deposit index={this.props.index} onAddBank={this.onAddBank.bind(this)}/>
        <Withdrawal index={this.props.index} counters={this.state.counters}/>
      </span>
    );
  }

  onAddBank(e) {
    var depositMeasure = this.props.StringMeasure;
    var currBankForMeasure = this.state[depositMeasure];
    var newBankForMeasure = currBankForMeasure+1;
    this.setState({depositMeasure, newBankForMeasure});
  }
}
