// import React from "react";
// import { ResourceGuesser} from "@api-platform/admin";
//
// import { dataProvider as baseDataProvider } from '@api-platform/admin';
// import { Admin } from 'react-admin';
//
// import {ArticlesList, ArticlesCreate, ArticlesEdit, ArticlesShow} from './entity/Article';
// import {ClientsList, ClientsCreate, ClientsEdit, ClientsShow} from './entity/Client';
// import {ExperiencesList, ExperiencesCreate, ExperiencesEdit, ExperiencesShow} from './entity/Experience';
// import {MediaObjectsList, MediaObjectsCreate, MediaObjectsEdit, MediaObjectsShow} from './entity/MediaObject';
// import {ProjectsList, ProjectsCreate, ProjectsEdit, ProjectsShow} from './entity/Project';
// import {UsersList, UsersCreate, UsersEdit, UsersShow} from './entity/User';
//
// const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
//
// const dataProvider = baseDataProvider(entrypoint);
//
// export default () => (
//     <Admin
//         // apiDocumentationParser={ apiDocumentationParser }
//         dataProvider={ dataProvider }
//         // authProvider={ authProvider }
//         entrypoint={ entrypoint }
//     >
//         <ResourceGuesser name="articles" edit={ArticlesEdit} list={ArticlesList} create={ArticlesCreate} show={ArticlesShow}/>
//         <ResourceGuesser name="clients" edit={ClientsEdit} list={ClientsList} create={ClientsCreate} show={ClientsShow} />
//         <ResourceGuesser name="experiences" edit={ExperiencesEdit} list={ExperiencesList} create={ExperiencesCreate} show={ExperiencesShow} />
//         <ResourceGuesser name="media_objects" edit={MediaObjectsEdit} list={MediaObjectsList} create={MediaObjectsCreate} show={MediaObjectsShow}/>
//         <ResourceGuesser name="projects" edit={ProjectsEdit} list={ProjectsList} create={ProjectsCreate} show={ProjectsShow} />
//         <ResourceGuesser name="users" edit={UsersEdit} list={UsersList} create={UsersCreate} show={UsersShow} />
//     </Admin>
// );

// in src/App.js
import React from 'react';
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => <Admin dataProvider={dataProvider} />;

export default App;
