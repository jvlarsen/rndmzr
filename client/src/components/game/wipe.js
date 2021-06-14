import React from 'react';

export default class Wipe extends React.Component {
  render() {

    return(
      <input type="button" id='wipeButton' onClick={this.props.wipe} value="Click here to wipe existing game." />
    )
  }
}
