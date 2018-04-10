import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// on enter pushes new item with 0 height
// on leave makes index 0 to height 0 and index 5 to height 100%
// after finishing, the first item will be cut
// and we are in a fine state
// but the state is made in the parent component
// so we need a handler here where we cann pass a callback to


export default class Ticker extends Component {

  render() {
    console.log(this.props.events);
    return (
      <ReactCSSTransitionGroup
        component="ul"
        className="eventTracker"
        transitionName="example"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {this.props.events.map(data => {
          return (
            <li key={data.time + data.coordinates[0]} className="eventTrackerBox" style={{ backgroundColor: data.color }}>
              <div className="eventTrackerItem">
                <div className="eventTrackerItem__TS">
                  {new Date(data.time).toISOString().substring(11, 19)}
                </div>
                <div className="eventTrackerItem__ID">
                  {data.id}
                </div>
                <div className="eventTrackerItem__ev">
                  {data.event}
                </div>
                <div className="eventTrackerItem__city">
                  {data.name}
                </div>
              </div>
            </li>
          )
        })}
      </ReactCSSTransitionGroup>
    )
  }
}