import React from 'react';

export default class Randomize extends React.Component {

render() {
  return (
      <input type="button" id="randomizerButton" className="randomizer warning" value="RANDOMIZE" onClick={this.props.onClick} />
    );
  }
}
