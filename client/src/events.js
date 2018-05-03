import React from 'react';
import Connector from './helpers/connector';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[]
    }
  }

  componentWillMount() {
    var self = this;
    Connector.getEvents().then(function(result) {
      self.setState({events:result});
    });
  }

  render() {
    var eventRadios = [];
    var selectedOption = (this.props.selectedOption) ? this.props.selectedOption.value : null;
    var allEvents = this.state.events;

    const onOptionChange = this.props.onOptionChange;
    allEvents.map((event) => {
      var value = this.props.refereeSelected ? event.RefereeName : event.Name;

      eventRadios.push(<div className="radio" key={event.Id} >
              <label>
                <input className='bigradio' type="radio" value={value} measure={event.Type} key={event.Id} checked={selectedOption === event.Name || selectedOption === event.RefereeName} onChange={onOptionChange}/>
                {value}
              </label>
            </div>);
            return eventRadios;
          }
        );

    return (
      <form>
       {eventRadios}
      </form>
    );
  }
}
