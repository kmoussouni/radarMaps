import ReactOnRails from 'react-on-rails';
// import RecipesApp from './RecipesAppServer';

import Header from './Components/Header';
import SimpleMap from './Components/SimpleMap';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <Header />
            <SimpleMap />
        </div>;
    }
}

ReactOnRails.register({ App, SimpleMap });
