import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import GoogleMapReact from 'google-map-react';
// import '@google/markerclustererplus';

import axios from 'axios';

// const fetcher = (...args) => fetch(...args).then(response => response.json());

// import Marker from "../Marker/Marker";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

export default class SimpleMap extends React.Component {

    constructor() {
        super();

        this.state = {
            radars: [],
            center: {
                lat: 47.014366,
                lng: 2.565466
            },
            zoom: 7,
        };
        // const map = [];
    }

    componentDidMount()
    {
        axios.get(`/api/radar/list`)
            .then(res => {
                let radars = res.data.query;
                this.setState({radars});
            });
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
            <LoadScript
                googleMapsApiKey={this.props.apiKey}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={this.state.center}
                    zoom={this.state.zoom}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                    {this.state.radars.map(radar => (
                        <Marker key={Math.random()}
                                position={new window.google.maps.LatLng(radar.latitude, radar.longitude)}
                            // lat={radar.latitude}
                            // lng={radar.longitude}
                            // text={radar.name}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            {/*<GoogleMap*/}
            {/*    key={ this.props.apiKey }*/}
            {/*    // bootstrapURLKeys={{ key: new String(this.props.apiKey).toString() }}*/}
            {/*    defaultCenter={this.state.center}*/}
            {/*    defaultZoom={this.state.zoom}*/}
            {/*    yesIWantToUseGoogleMapApiInternals*/}
            {/*        >*/}
            {/*    {this.state.radars.map(radar => (*/}
            {/*        <Marker key={Math.random()}*/}
            {/*            lat={radar.latitude}*/}
            {/*            lng={radar.longitude}*/}
            {/*            text={radar.name}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</GoogleMap>*/}
            {/*<LoadScript*/}
            {/*    googleMapsApiKey={ this.props.apiKey }*/}
            {/*>*/}
            {/*    <GoogleMap*/}
            {/*        // key={ this.props.apiKey }*/}
            {/*        onLoad={map => {*/}
            {/*            const bounds = new window.google.maps.LatLngBounds();*/}
            {/*            map.fitBounds(bounds);*/}
            {/*        }}*/}
            {/*        onUnmount={map => {*/}
            {/*            // do your stuff before map is unmounted*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</LoadScript>*/}
        </div>
            ;
    }
}
