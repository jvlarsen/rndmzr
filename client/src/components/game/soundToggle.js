import React from 'react';

export default class SoundToggle extends React.Component {
    render() {
  
      return(
        <input type="button" id='soundToggle' onClick={this.props.onClick} value="Tænd/sluk lyden" />
      )
    }
  }
  