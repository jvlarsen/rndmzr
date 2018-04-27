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
    //Fetches all events correctly, but state is not updated in time for render() to know about the events.
    var self = this;

    //Connector.getEvents().then(function(result) {
    //  self.setState({events:result});
    //});
  }

  render() {
    var eventRadios = [];
    var selectedOption = this.props.selectedOption;
    var allEvents = this.state.events;
    const onOptionChange = this.props.onOptionChange;
    allEvents.map((event) => {
      eventRadios.push(<div className="radio" key={event.Id}>
              <label>
                <input className='bigradio' type="radio" value={event.Name} key={event.Id} checked={selectedOption === event.Name} onChange={onOptionChange}/>
                {event.Name}
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
