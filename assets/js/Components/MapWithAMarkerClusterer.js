import React from 'react';
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

class MapWithAMarkerClusterer extends React.Component {
    constructor(props) {
        super(props);
        this.loadingElement = "<div style={{ height: `100%` }} />";
        this.containerElement = "<div style={{ height: `400px` }} />";
        this.mapElement = "<div style={{ height: `100%` }} />";
    }

    onMarkerClustererClick(e) {
        e.preventDefault();
        let markerClusterer = e.target;

        const clickedMarkers = markerClusterer.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
    }

    // withScriptjs,
    // withGoogleMap
    render() {
        return (
            <GoogleMap
                defaultZoom={3}
                defaultCenter={{ lat: 48.840237, lng: 2.547122 }}
            >
                <MarkerClusterer
                    onClick={this.onMarkerClustererClick(e)}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {props.markers.map(marker => (
                        <Marker
                            key={marker.name}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default MapWithAMarkerClusterer;
