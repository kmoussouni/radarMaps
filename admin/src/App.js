import React from "react";
import {HydraAdmin, ResourceGuesser, dataProvider as baseDataProvider, fetchHydra as baseFetchHydra} from '@api-platform/admin';
import 'ra-core';
import {ReactReduxContext} from 'react-redux';
import useHistory from 'react-router-dom';

import {ArticlesList, ArticlesEdit, ArticlesCreate, ArticlesShow} from "./entity/Article";
// import {QuotationsList, QuotationsEdit, QuotationsCreate} from "./entity/Quotation";

const fetchHeaders = {
    // 'Authorization': `Bearer ${window.localStorage.getItem('token')}`
};
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
    ...options,
    headers: new Headers(fetchHeaders),
});
// const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
const entrypoint = 'http://karimmoussouni.local/api';

// console.log(entrypoint);

const dataProvider = baseDataProvider(entrypoint, fetchHydra);

export default () => (
    <HydraAdmin
        title={'Karim Moussouni Admin'}
        entrypoint={entrypoint}
        // dataProvider={dataProvider}
    >
        {/*<Resource name="articles" label="Articles" />*/}
        <ResourceGuesser name="articles" list={ArticlesList} create={ArticlesCreate} edit={ArticlesEdit} show={ArticlesShow} />
        <ResourceGuesser name="clients" label="Clients" />
        <ResourceGuesser name="experiences" label="Experiences" />
        <ResourceGuesser name="quotations" label="Quotations" />
        <ResourceGuesser name="users" label="Users" />
    </HydraAdmin>
);


