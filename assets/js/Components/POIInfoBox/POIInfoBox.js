import React, { Component } from 'react';
import ReactOnRails from "react-on-rails";
// import {InfoBox, InfoBoxComponent} from "@react-google-maps/api/dist/components/addons/InfoBox";
import {InfoBox, InfoBoxComponent} from '@react-google-maps/api';
// import {InfoBoxComponent} from "@react-google-maps/api/src/components/addons/InfoBox";

const optionsInfoBox = { closeBoxURL: 'DDD', enableEventPropagation: true };

const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
};

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
    width: '100px',
    height: '100px'
}

export default class POIInfoBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let radar=this.props.radar;

        console.log("eee")

        return <InfoBox
            anchor={props.anchor}
            onLoad={onLoad}
            options={optionsInfoBox}
            position={new window.google.maps.LatLng(radar.latitude, radar.longitude)}
            zIndex={10000000000}
            style={{
                backgroundColor: 'white',
                opacity: 1,
                padding: 12,
                width: '100px',
                height: '100px',
                top: '10px',
                right: '10px',
                zindex: 10000000
            }}
        >
            <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
                <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                    Hello, World!
                </div>
            </div>
            {/*<div className={"card"} style={divStyle}>*/}
            {/*    <div className={"card-item"}>*/}
            {/*        <h1>InfoWindow</h1>*/}
            {/*        <p>{radar.name}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </InfoBox>
    }
}

ReactOnRails.register({ POIInfoBox });