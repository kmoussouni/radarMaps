import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';

import Header from './Components/Page/Header/Header';
import SimpleMap from './Components/Map/SimpleMap';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    render() {
        return <div>
            <Header />
            <SimpleMap key={this.props.apiKey} />
        </div>;
    }
}

ReactOnRails.register({ App, Header, SimpleMap });
