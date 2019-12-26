import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {
                name: "Noisy le Grand, France"
            },
            style: {
                width: '100%',
                height: '100%'
            }
        };
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={this.state.style}
                initialCenter={{
                    lat: 48.840237,
                    lng: 2.547122
                }}
                onClick={this.onMapClicked}
            >

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAAx06eUq4v6lPkvUSmwZf-7C_bzLGpz60")
})(MapContainer)