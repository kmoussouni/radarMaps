import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { ReactReduxContext } from 'react-redux';

import { dataProvider as baseDataProvider } from '@api-platform/admin';
// import jsonServerProvider from 'ra-data-json-server';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const dataProvider = baseDataProvider(entrypoint);

const App = () => (
    <Admin
        dataProvider={dataProvider}
        entrypoint={ entrypoint }
    >
        <Resource name="articles" list={ListGuesser} />
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;