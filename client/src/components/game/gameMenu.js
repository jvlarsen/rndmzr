import React from 'react';
import Wipe from './wipe';
import Loader from './loader';
import GraphSelector from './graphSelector';
import SoundToggle from './soundToggle';
import './game.css';

export default class GameMenu extends React.Component {
  render() {
    return(
      <div className='gameMenuDiv'>
        <Wipe wipe={this.props.wipe}/>
        <Loader gameDataLoaded={this.props.gameDataLoaded}/>
        <GraphSelector onClick={this.props.onClick} />
        <SoundToggle onClick={this.props.soundToggle} />
      </div>
    )
  }
}
