import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from "../Marker/Marker";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor() {
        super();

        this.state = {
            center: {
                lat: 47.014366,
                lng: 2.565466
            },
            zoom: 7
        };
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAv6BlmTxIwpUeX6Oa16Zg9R98HJMfka-I' }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
            >
            <Marker
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
            />
            </GoogleMapReact>
            </div>
    ;
    }
}
