import React from "react";
import { HydraAdmin, ResourceGuesser} from "@api-platform/admin";

import {ArticlesList, ArticlesCreate, ArticlesEdit, ArticlesShow} from './entity/Article';
import {ClientsList, ClientsCreate, ClientsEdit, ClientsShow} from './entity/Client';
import {ExperiencesList, ExperiencesCreate, ExperiencesEdit, ExperiencesShow} from './entity/Experience';
import {MediaObjectsList, MediaObjectsCreate, MediaObjectsEdit, MediaObjectsShow} from './entity/MediaObject';
import {ProjectsList, ProjectsCreate, ProjectsEdit, ProjectsShow} from './entity/Project';
import {UsersList, UsersCreate, UsersEdit, UsersShow} from './entity/User';

export default () => (
    <HydraAdmin entrypoint="http://karimmoussouni.local/api">
        <ResourceGuesser name="articles" edit={ArticlesEdit} list={ArticlesList} create={ArticlesCreate} show={ArticlesShow}/>
        <ResourceGuesser name="clients" edit={ClientsEdit} list={ClientsList} create={ClientsCreate} show={ClientsShow} />
        <ResourceGuesser name="experiences" edit={ExperiencesEdit} list={ExperiencesList} create={ExperiencesCreate} show={ExperiencesShow} />
        <ResourceGuesser name="media_objects" edit={MediaObjectsEdit} list={MediaObjectsList} create={MediaObjectsCreate} show={MediaObjectsShow}/>
        <ResourceGuesser name="projects" edit={ProjectsEdit} list={ProjectsList} create={ProjectsCreate} show={ProjectsShow} />
        <ResourceGuesser name="users" edit={UsersEdit} list={UsersList} create={UsersCreate} show={UsersShow} />
    </HydraAdmin>
);