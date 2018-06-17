import React from 'react';

export default class BankWithdrawal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'Small':this.props.counters.Small, 'Medium':this.props.counters.Medium, 'Large':this.props.counters.Large, 'Walter':this.props.counters.Walter}
  }

  render() {
    return (
      <span>
        <input type="button" id={'withdrawSmall'+this.props.index} className="drink small" value={"Small " + this.props.counters.Small} onClick={this.props.onDrinkBank} measure="Small" counter={this.props.counters.Small} />

        <input type="button" id={'withdrawMedium'+this.props.index} className="drink medium" value={"Medium " + this.props.counters.Medium} onClick={this.props.onDrinkBank} measure="Medium" counter={this.props.counters.Medium} />

        <input type="button" id={'withdrawLarge'+this.props.index} className="drink large" value={"Large " + this.props.counters.Large} onClick={this.props.onDrinkBank} measure="Large" counter={this.props.counters.Large} />

        <input type="button" id={'withdrawWalter'+this.props.index} className="drink walter" value={"Walter " + this.props.counters.Walter} onClick={this.props.onDrinkBank} measure="Walter" counter={this.props.counters.Walter} />
      </span>
    );
  }
}
