import React from 'react';
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    GoogleMap,
    Marker
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

class MapMarkerClusterer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }

    onMarkerClustererClick(markerClusterer) {
        const clickedMarkers = markerClusterer.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={3}
                defaultCenter={{ lat: 45.0391667, lng: 4.525 }}
            >
                <MarkerClusterer
                    onClick={this.props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.props.markers.map(function(marker) {
                        return <Marker
                            key={marker.id}
                            position={new google.maps.LatLng(marker.latitude, marker.longitude)}
                        />
                    })}
                </MarkerClusterer>
            </GoogleMap>
     );
    }
}

export default MapMarkerClusterer;
