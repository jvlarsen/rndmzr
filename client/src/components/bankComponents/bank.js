import React from 'react';
import Deposit from './bankDeposit';
import Withdrawal from './bankWithdrawal';
import Connector from './../../helpers/connector';
import AppFunc from './../../helpers/appFunctions';

//Deposit skal have en onAddBank() sendt som props.
export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter:{'Lille':0, 'Memmel':0, 'Stor':0, 'Walter':0}};
  }

  componentDidUpdate() {
    Connector.saveCounter(this.state.counter, this.props.index);
  }

  componentWillMount() {
    var allCounters = Connector.loadFromLocal('allCounters') || {};
    if (allCounters[this.props.index]) {
      this.setState({counter:allCounters[this.props.index]});
    }
  }

  render() {
    return (
      <span className="bankGroup">
        <Deposit index={this.props.index} allocationkey={this.props.index} onAddBank={this.onAddBank.bind(this)}/>
        <Withdrawal index={this.props.index} counters={this.state.counter} onDrinkBank={this.onDrinkBank.bind(this)}/>
      </span>
    );
  }

  onAddBank(e) {
    var depositButton = e.target;
    var index = depositButton.getAttribute('allocationkey');
    var depositMeasure = document.getElementById('status' + index);
    var allCounters = {...this.state.counter};
    allCounters[depositMeasure.value] = allCounters[depositMeasure.value]+1;
    this.setState({counter:allCounters});

    depositMeasure.value = '';

    AppFunc.playAudio('Bank');
  }

  onDrinkBank(e) {
    var measure = e.target.getAttribute('measure');
    var currCounter = this.state.counter[measure];
    var newCounter = currCounter >= 1 ? currCounter - 1 : 0;
    var allCounters = {...this.state.counter};
    allCounters[measure] = newCounter;
    this.setState({counter:allCounters});
  }
}
