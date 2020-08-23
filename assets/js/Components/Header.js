import ReactOnRails from 'react-on-rails';

import React, { Component } from 'react';

export default class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return <div>Header</div>;
    }
}

ReactOnRails.register({ Header });
