import React from 'react';
import {GoogleMap, LoadScript, MarkerClusterer, StandaloneSearchBox} from '@react-google-maps/api';

import axios from 'axios';
import POIMarker from "../POIMarker/POIMarker";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const options = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }

const center = {
    lat: 47.014366,
    lng: 2.565466
};

const zoom= 7;

// const onLoad = ref => this.searchBox = ref;

export default class SimpleMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radars: []
        }
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
        let props=this.props;

        return <div style={{ height: '100vh', width: '100%' }}>
            <LoadScript googleMapsApiKey={props.apiKey} libraries={["places", "drawing", "geometry", "visualization"]}>
                <StandaloneSearchBox key={"StandaloneSearchBox"}
                                     style={{
                                         boxSizing: `border-box`,
                                         border: `1px solid transparent`,
                                         width: `240px`,
                                         height: `320px`,
                                         padding: `12px 12px`,
                                         borderRadius: `3px`,
                                         boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                         fontSize: `14px`,
                                         // outline: `none`,
                                         textOverflow: `ellipses`,
                                         position: 'inherit',
                                         top: '10px',
                                         right: '10px',
                                         zindex: 10000000
                                     }}>
                    <input id={"searchInput"} type='text' placeholder='Customized your placeholder'
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `200px`,
                            height: `32px`,
                            padding: `12px 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            // outline: `none`,
                            textOverflow: `ellipses`,
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            zindex: 10000000
                        }}
                    />
                </StandaloneSearchBox>
                <GoogleMap
                    id={"radarMap"}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                >
                    <MarkerClusterer options={options}>
                        {(clusterer) =>
                            this.state.radars.map((radar) => (
                                <POIMarker key={radar.id} radar={radar} clusterer={clusterer} />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </div>
            ;
    }
}
