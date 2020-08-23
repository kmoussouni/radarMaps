import React, { Component } from 'react';
import ReactOnRails from "react-on-rails";

export default class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            lat: this.props.lat,
            lng: this.props.lng,
        }
    }

    render() {

        return <div>
            {this.state.text}
        </div>;
    }
}

ReactOnRails.register({ Marker });

// export default class SimpleMap extends Component {
//     constructor() {
//         super();
//
//         this.state = {
//             center: {
//                 lat: 47.014366,
//                 lng: 2.565466
//             },
//             zoom: 7
//         };
//     }
//
//     render() {
//         return <div style={{ height: '100vh', width: '100%' }}>
//     <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyAv6BlmTxIwpUeX6Oa16Zg9R98HJMfka-I' }}
//         defaultCenter={this.state.center}
//         defaultZoom={this.state.zoom}
//             >
//             <AnyReactComponent
//         lat={59.955413}
//         lng={30.337844}
//         text="My Marker"
//             />
//             </GoogleMapReact>
//             </div>
//     ;
//     }
// }
