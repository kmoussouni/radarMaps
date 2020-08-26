import ReactOnRails from 'react-on-rails';
import React from 'react';

import Header from './Components/Page/Header/Header';
import SimpleMap from './Components/Map/SimpleMap';
import POIMarker from './Components/POIMarker/POIMarker';
import POIInfoBox from './Components/POIInfoBox/POIInfoBox';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <div className={"articles"}>
            <Header />
            <SimpleMap key={this.props.apiKey} />
        </div>
            ;
    }
}

ReactOnRails.register({ App, Header, SimpleMap, POIMarker, POIInfoBox });
