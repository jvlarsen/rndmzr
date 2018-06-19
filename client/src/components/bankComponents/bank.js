import React from 'react';
import Deposit from './bankDeposit';
import Withdrawal from './bankWithdrawal';
import Connector from './../../helpers/connector';


//Deposit skal have en onAddBank() sendt som props.
export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter:{'Small':0, 'Medium':0, 'Large':0, 'Walter':0}};
  }

  componentDidUpdate() {
    Connector.saveCounter(this.state.counter, this.props.index);
  }

  componentWillMount() {
    var allCounters = Connector.loadFromLocal('allCounters') || {};
    if (allCounters[this.props.index]) {
      console.log('found it');
      console.log(allCounters[this.props.index]);
      this.setState({counter:allCounters[this.props.index]});
    }
    else {
      console.log('not found');
      console.log(this.props.index);
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
    //Den her skal kaldes når Bank skal loades.
    var depositButton = e.target;
    var index = depositButton.getAttribute('allocationkey');
    var depositMeasure = document.getElementById('status' + index);
    var allCounters = {...this.state.counter};
    allCounters[depositMeasure.value] = allCounters[depositMeasure.value]+1;
    this.setState({counter:allCounters});

    depositMeasure.value = '';
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
