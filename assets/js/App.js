import React from 'react';
import ReactDOM from 'react-dom';
// ReactDOM.render(<MapMarkerClusterer markers={[]}/>, document.getElementById('root'));

const fetch = require("isomorphic-fetch");
const { compose, defaultProps, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    withStateHandlers,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    defaultProps({
        key: "AIzaSyAAx06eUq4v6lPkvUSmwZf-7C_bzLGpz60"
    }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+"AIzaSyAAx06eUq4v6lPkvUSmwZf-7C_bzLGpz60"+"&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        markers: {'records': []}
    }),
    withHandlers(
        {
            onMarkerClustererClick: () => (markerClusterer) => {
        // function(markerClusterer)
            // console.log(e)
            // e.preventDefault();
            // onMarkerClustererClick: () => (markerClusterer) => {
            // const clickedMarkers = e.target.getMarkers()
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        }
        // {
        //         const clickedMarkers = markerClusterer.getMarkers()
        //         console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        //         console.log(clickedMarkers)
        //     },
        }
    ),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 45.0391667, lng: 2.525 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
            markers={[]}
        >
            {/*<InfoBox*/}
            {/*    defaultPosition={new google.maps.LatLng(45.33455, 2.344233)}*/}
            {/*    options={{ closeBoxURL: ``, enableEventPropagation: true }}*/}
            {/*>*/}
            {/*    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>*/}
            {/*        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>*/}
            {/*            Hello, Taipei!*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</InfoBox>*/}

            {(console.log(props.markers.records))}
            {props.markers.records != 'undefined' ?
                    props.markers.records.map(marker => (
                    <Marker
                        key={marker.recordid}
                        position={{ lat: parseFloat(marker.geometry.coordinates[0]), lng: parseFloat(marker.geometry.coordinates[1]) }}
                    >
                    </Marker>
                )) : ''
            }
        </MarkerClusterer>
    </GoogleMap>
);

class DemoApp extends React.PureComponent {
    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {
        const url = [
            // Length issue
            'https://data.opendatasoft.com',
            'api',
            'records',
            '1.0',
            'search',
            '?dataset=radars%40public&facet=department&facet=type&facet=radarinstalldate&facet=radarequipment&facet=radarplace&facet=rulesmesured_name&facet=radartype_csvvalue&refine.radarplace=PARIS'
        ].join("/")

        // const url = [
        //     // Length issue
        //     `http://radar.local`,
        //     `api`,
        //     `radars.json`
        // ].join("/")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data });
            });
    }

    render() {
        return (
            <MapWithAMarkerClusterer key={"AIzaSyAAx06eUq4v6lPkvUSmwZf-7C_bzLGpz60"} markers={this.state.markers} />
        )
    }
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));
