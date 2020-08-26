import React, { Component } from 'react';
import ReactOnRails from "react-on-rails";

import {Marker} from '@react-google-maps/api';
import POIInfoBox from "../POIInfoBox/POIInfoBox";

export default class POIMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            text: this.props.text,
            lat: this.props.lat,
            lng: this.props.lng,
        }
    }

    render() {
        let radar=this.props.radar;
        let clusterer=this.props.clusterer;

        return <Marker
            key={radar.id}
            label={""}
            title={radar.name}
            position={new window.google.maps.LatLng(radar.latitude, radar.longitude)}
            onClick={function(e){
               console.log(e);

               return <POIInfoBox key={"POIInfoBox"+radar.id} anchor={this} radar={radar}></POIInfoBox>;
            }}
            clusterer={clusterer}
        />
    }
}

ReactOnRails.register({ POIMarker });