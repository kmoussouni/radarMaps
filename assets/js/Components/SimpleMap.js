import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor() {
        super();

        this.defaultProps = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11
        };
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAAx06eUq4v6lPkvUSmwZf-7C_bzLGpz60' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
            >
            <AnyReactComponent
        lat={59.955413}
        lng={30.337844}
        text="My Marker"
            />
            </GoogleMapReact>
            </div>
    ;
    }
}
