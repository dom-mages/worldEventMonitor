import './App.css';
import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import world from './world.json';
import { feature } from "topojson-client"
import Ticker from './Ticker';
import EventMarker from './EventMarker';

const sampleMarks = [
  { name: "Vienna", coordinates: [16.363449, 48.210033] },
  { name: "Zurich", coordinates: [8.564572, 47.451542] },
  { name: "Paris", coordinates: [2.3522, 48.8566] },
  { name: "Dublin", coordinates: [-6.266155, 53.350140] },
  { name: "Berlin", coordinates: [13.404954, 52.520008] },
  { name: "Warsaw", coordinates: [21.017532, 52.237049] },
  { name: "Athens", coordinates: [23.727539, 37.983810] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  { name: "Jakarta", coordinates: [106.8650, -6.1751] },
  { name: "Delhi", coordinates: [77.1025, 28.7041] },
  { name: "Manila", coordinates: [120.9842, 14.5995] },
  { name: "Seoul", coordinates: [126.9780, 37.5665] },
  { name: "Shanghai", coordinates: [121.4737, 31.2304] },
  { name: "Karachi", coordinates: [67.0099, 24.8615] },
  { name: "Beijing", coordinates: [116.4074, 39.9042] },
  { name: "New York", coordinates: [-74.0059, 40.7128] },
  { name: "Guangzhou", coordinates: [113.2644, 23.1291] },
  { name: "Sao Paulo", coordinates: [-46.6333, -23.5505] },
  { name: "Mexico City", coordinates: [-99.1332, 19.4326] },
  { name: "Mumbai", coordinates: [72.8777, 19.0760] },
  { name: "Osaka", coordinates: [135.5022, 34.6937] },
  { name: "Moscow", coordinates: [37.6173, 55.7558] },
  { name: "Dhaka", coordinates: [90.4125, 23.8103] },
  { name: "Greater Cairo", coordinates: [31.2357, 30.0444] },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] },
  { name: "Bangkok", coordinates: [100.5018, 13.7563] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726] },
  { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
  { name: "Tehran", coordinates: [51.3890, 35.6892] },
  { name: "Istanbul", coordinates: [28.9784, 41.0082] },
  { name: "Lagos", coordinates: [3.3792, 6.5244] },
  { name: "Shenzhen", coordinates: [114.0579, 22.5431] },
  { name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068] },
  { name: "Kinshasa", coordinates: [15.2663, -4.4419] },
  { name: "Tianjin", coordinates: [117.3616, 39.3434] },
  { name: "Lima", coordinates: [-77.0428, -12.0464] },
]

const sampleEvents = [
  { event: "User Login", color: "#fd8" },
  { event: "Deployment", color: "#fff" },
  { event: "Loaded", color: "#8D8" },
  { event: "New Account", color: "#d88" },
  { event: "Saved", color: "#dfd" },
  { event: "Purchase", color: "#fff" },
  { event: "Execution", color: "#88d" },
  { event: "Email Sent", color: "#d8d" },
  { event: "Report generated", color: "#d8d" },
]

class WorldMap extends Component {
  state = {
    event: null,
    eventList: [],
    worldData: feature(world, world.objects.countries).features,
  }

  handleCountryClick = (countryIndex) => {
    console.log("Clicked on a country: ", this.state.worldData[countryIndex])
  }
  handleMarkerClick = (markerIndex) => {
    console.log("Marker: ", this.state.cities[markerIndex])
  }

  projection = () => {
    return geoMercator()
      .scale(140)
      .translate([800 / 2, 450 / 2])
  }

  generateRandomEvent = () => {
    const event = { ...sampleMarks[Math.floor(Math.random() * sampleMarks.length)], ...sampleEvents[Math.floor(Math.random() * sampleEvents.length)], time: Date.now() }
    const events = [...this.state.eventList, event];
    if (events.length > 5) {
      events.splice(0, 1)
    }
    this.setState({ event, eventList: events })
  }

  renderMarker = () => (
    <g>
      <circle
        key={`marker-${1 * Math.random()}`}
        cx={this.projection()(this.state.event.coordinates)[0]}
        cy={this.projection()(this.state.event.coordinates)[1]}
        r={"0%"}
        fill={this.state.event.color}
        stroke="#FFFFFF"
        onClick={() => this.handleMarkerClick(1)}
      >
        <animate attributeName="r" begin="0s" dur="2s" repeatCount="indefinte" from="0%" to="1.5%" />
      </circle>
    </g>
  )

  render() {
    return (
      <div>
        <button className="tryit" onClick={this.generateRandomEvent}>Event</button>
        <svg className='map' viewBox="0 0 800 450">
          <g className="countries">
            {
              this.state.worldData.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country"
                  // fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                  fill={`rgba(38,50,56,${1})`}
                  stroke="#FFFFFF"
                  strokeWidth={0.2}
                  onClick={() => this.handleCountryClick(i)}
                />
              ))
            }
          </g>
          {
            this.state.eventList ?
              <EventMarker events={this.state.eventList} projection={this.projection} />
              : ""
          }
        </svg>
        <Ticker events={this.state.eventList} />
      </div>
    )
  }
}

export default WorldMap