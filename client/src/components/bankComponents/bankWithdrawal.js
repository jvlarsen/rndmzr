import React from 'react';

export default class BankWithdrawal extends React.Component {

  render() {
    return (
      <div>
        <WithdrawalButton id={this.props.index} className="drink small" value="Small ()" />
        <WithdrawalButton id={this.props.index} className="drink medium" value="Medium ()" />
        <WithdrawalButton id={this.props.index} className="drink walter" value="Large ()" />
        <WithdrawalButton id={this.props.index} className="drink walter" value="Walter ()" />
      </div>
    );
  }
}

class WithdrawalButton extends React.Component {

  render() {
    return (
      <input type="button" id={this.props.id} value={this.props.value} />
    );
  }
}
