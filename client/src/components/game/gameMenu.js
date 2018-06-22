import React from 'react';
import Wipe from './wipe';
import Loader from './loader';

export default class GameMenu extends React.Component {
  render() {
    return(
      <div>
        <Wipe wipe={this.props.wipe}/>
        <Loader gameDataLoaded={this.props.gameDataLoaded}/>
      </div>
    )
  }
}
