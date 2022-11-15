import React from 'react';
import Wipe from './wipe';
import Loader from './loader';
import GraphSelector from './graphSelector';
import SoundToggle from './soundToggle';

export default class GameMenu extends React.Component {
  render() {
    return(
      <div>
        <Wipe wipe={this.props.wipe}/>
        <Loader gameDataLoaded={this.props.gameDataLoaded}/>
        <GraphSelector onClick={this.props.onClick} />
        <SoundToggle onClick={this.props.soundToggle} />
      </div>
    )
  }
}
