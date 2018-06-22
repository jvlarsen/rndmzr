import React from 'react';
import './bank.css';

export default class BankWithdrawal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'Lille':this.props.counters.Small, 'Memmel':this.props.counters.Medium, 'Stor':this.props.counters.Large, 'Walter':this.props.counters.Walter}
  }

  render() {
    return (
      <span>
        <input type="button" id={'withdrawSmall'+this.props.index} className="drink small bigtext" value={"Lille " + this.props.counters.Lille} onClick={this.props.onDrinkBank} measure="Lille" counter={this.props.counters.Lille} />

        <input type="button" id={'withdrawMedium'+this.props.index} className="drink medium bigtext" value={"Memmel " + this.props.counters.Memmel} onClick={this.props.onDrinkBank} measure="Memmel" counter={this.props.counters.Memmel} />

        <input type="button" id={'withdrawLarge'+this.props.index} className="drink large bigtext" value={"Stor " + this.props.counters.Stor} onClick={this.props.onDrinkBank} measure="Stor" counter={this.props.counters.Stor} />

        <input type="button" id={'withdrawWalter'+this.props.index} className="drink walter bigtext" value={"Walter " + this.props.counters.Walter} onClick={this.props.onDrinkBank} measure="Walter" counter={this.props.counters.Walter} />
      </span>
    );
  }
}
