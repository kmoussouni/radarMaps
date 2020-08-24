import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import Marker from "../Marker/Marker";

export default class SimpleMap extends Component {

    constructor() {
        super();

        this.state = {
            radars: [],
            center: {
                lat: 47.014366,
                lng: 2.565466
            },
            zoom: 7,
            // mapRef: useRef()
        };
    }

    getRadars()
    {
    //     axios.get(`/api/radar/list`)
    //         .then(res => {
    //             let radars = res.query;
    //             console.log(radars);
    //             this.setState({radars});
    //         });
    //
    //     console.log(this.state.radars);

        this.setState({radars: [1, 3, 4]});
    }
    //
    componentDidMount()
    {
        this.getRadars();
        axios.get(`/api/radar/list`)
            .then(res => {
                // console.log(res);
                let radars = res.data.query;
    //             console.log(radars);
                this.setState({radars});
            });
    //
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                key={ this.props.apiKey }
                // bootstrapURLKeys={{ key: new String(this.props.apiKey).toString() }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                yesIWantToUseGoogleMapApiInternals
                    >
                {this.state.radars.map(radar => (
                    <Marker key={Math.random()}
                        lat={radar.latitude}
                        lng={radar.longitude}
                        text={radar.name}
                    />
                ))}
            </GoogleMapReact>
        </div>
            ;
    }
}
