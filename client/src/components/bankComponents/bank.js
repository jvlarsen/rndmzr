import React from 'react';
import Deposit from './bankDeposit';
import Withdrawal from './bankWithdrawal';


//Deposit skal have en onAddBank() sendt som props.
export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counters:{'Small':0, 'Medium':0, 'Large':0, 'Walter':0}};
  }

  render() {
    return (
      <span className="bankGroup">
        <Deposit index={this.props.index} allocationkey={this.props.index} onAddBank={this.onAddBank.bind(this)}/>
        <Withdrawal index={this.props.index} counters={this.state.counters} onDrinkBank={this.onDrinkBank.bind(this)}/>
      </span>
    );
  }

  onAddBank(e) {
    var depositButton = e.target;
    var index = depositButton.getAttribute('allocationkey');
    var depositMeasure = document.getElementById('status' + index);
    var allCounters = {...this.state.counters};
    allCounters[depositMeasure.value] = allCounters[depositMeasure.value]+1;
    this.setState({counters:allCounters});

    depositMeasure.value = '';
  }

  onDrinkBank(e) {
    var measure = e.target.getAttribute('measure');
    var currCounter = this.state.counters[measure];
    var newCounter = currCounter >= 1 ? currCounter - 1 : 0;
    var allCounters = {...this.state.counters};
    allCounters[measure] = newCounter;
    this.setState({counters:allCounters});

    //this.setState({measure:newCounter >= 0 ? newCounter : 0});
  }
}
