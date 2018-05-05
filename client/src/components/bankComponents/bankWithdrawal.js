import React from 'react';

export default class BankWithdrawal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'counters':this.props.counters}
  }

  render() {
    return (
      <div>
        <WithdrawalButton id={this.props.index} className="drink small" value="Small " counter={this.state.counters.Small} />
        <WithdrawalButton id={this.props.index} className="drink medium" value="Medium " counter={this.state.counters.Medium} />
        <WithdrawalButton id={this.props.index} className="drink walter" value="Large " counter={this.state.counters.Large} />
        <WithdrawalButton id={this.props.index} className="drink walter" value="Walter " counter={this.state.counters.Walter}  />
      </div>
    );
  }
}

class WithdrawalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'counter':this.props.counter};
  }

  render() {
    return (
      <input type="button" id={this.props.id} value={this.props.value + this.state.counter} onClick={this.drinkOne.bind(this)}/>
    );
  }

  drinkOne(e) {
    //e.preventDefault();
    var currCounter = this.state.counter;
    var newCounter = currCounter - 1;
    this.setState({counter:newCounter >= 0 ? newCounter : 0});
  }
}
