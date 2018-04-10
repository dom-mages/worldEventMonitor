import React, { Component } from 'react';

export default class EventMarker extends Component {
  render() {
    const { events, projection } = this.props;
    return (
      <g>
        {
          events.map(event => (
            <g key={event.time + event.coordinates[0]}>
              <rect
                className="monitor__marker"
                id={`tag${event.time}${event.coordinates}`}
                width="100"
                height="15"
                x={projection()(event.coordinates)[0] - 50}
                y={projection()(event.coordinates)[1] - 22}
                fill={event.color}
                stroke="#000000"
              />
              <text
                className="monitor__marker"
                id={`tag${event.time}${event.coordinates}`}
                x={projection()(event.coordinates)[0]}
                y={projection()(event.coordinates)[1] - 14}
                textAnchor="middle"
                fontFamily="Helvetica Neue"
                fontSize="8px"
                fill="black"
                alignmentBaseline="central"
              >
                <tspan fontWeight="bold" textAnchor="middle" alignmentBaseline="central">{event.id}</tspan> {event.event}
              </text>
              <circle
                className="monitor__marker"
                id={event.time + event.coordinates[0]}
                cx={projection()(event.coordinates)[0]}
                cy={projection()(event.coordinates)[1]}
                r={"0%"}
                fill={event.color}
                stroke="#000000"
              />
            </g>
          ))
        }
      </g>
    )
  }
}