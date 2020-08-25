import React from 'react';
import {GoogleMap, LoadScript, MarkerClusterer, Marker, InfoWindow} from '@react-google-maps/api';
import MD5 from "crypto-js/md5";

import axios from 'axios';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const center = {
    lat: -3.745,
    lng: -38.523
};

const options = {
    imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

const onLoad = infoWindow => {
    console.log('infoWindow: ', infoWindow)
}

function createKey(radar) {
    // return MD5(radar.id);
    return MD5(radar.id + Math.random() + radar.lat + radar.lng + Math.random());
}

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
                    <MarkerClusterer options={options}>
                        {(clusterer) =>
                            this.state.radars.map((radar) => (
                                <Marker key={createKey(location)}
                                        position={new window.google.maps.LatLng(radar.latitude, radar.longitude)}
                                        onClick={function(e){
                                            // console.log(e);
                                            return <InfoWindow
                                                // onLoad={onLoad}
                                                position={new window.google.maps.LatLng(radar.latitude, radar.longitude)}>
                                                <div style={divStyle}>
                                                    <h1>InfoWindow</h1>
                                                    {/*<p>{radar.name}</p>*/}
                                                </div>
                                            </InfoWindow>;
                                        }}
                                        clusterer={clusterer} />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </div>
            ;
    }
}
