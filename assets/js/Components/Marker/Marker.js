import React, { Component } from 'react';
import ReactOnRails from "react-on-rails";

export default class Marker extends Component {
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

        return <div key={this.state.id} className={"card"}>
            <div className={"card-header"}>
                {this.state.speed}
            {/*</div>*/}
            {/*<div className={"card-item"}>*/}
                {this.state.text}
            </div>
        </div>;
    }
}

ReactOnRails.register({ Marker });