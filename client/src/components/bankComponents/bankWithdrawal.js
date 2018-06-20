import React from 'react';
import './bank.css';

export default class BankWithdrawal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'Small':this.props.counters.Small, 'Medium':this.props.counters.Medium, 'Large':this.props.counters.Large, 'Walter':this.props.counters.Walter}
  }

  render() {
    return (
      <span>
        <input type="button" id={'withdrawSmall'+this.props.index} className="drink small bigtext" value={"Lille " + this.props.counters.Small} onClick={this.props.onDrinkBank} measure="Small" counter={this.props.counters.Small} />

        <input type="button" id={'withdrawMedium'+this.props.index} className="drink medium bigtext" value={"Mimmel " + this.props.counters.Medium} onClick={this.props.onDrinkBank} measure="Medium" counter={this.props.counters.Medium} />

        <input type="button" id={'withdrawLarge'+this.props.index} className="drink large bigtext" value={"Stor " + this.props.counters.Large} onClick={this.props.onDrinkBank} measure="Large" counter={this.props.counters.Large} />

        <input type="button" id={'withdrawWalter'+this.props.index} className="drink walter bigtext" value={"Walter " + this.props.counters.Walter} onClick={this.props.onDrinkBank} measure="Walter" counter={this.props.counters.Walter} />
      </span>
    );
  }
}
