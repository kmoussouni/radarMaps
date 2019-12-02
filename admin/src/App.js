import React from "react";
import { HydraAdmin, ResourceGuesser, ListGuesser, FieldGuesser } from "@api-platform/admin";

import {UsersList, UserCreate} from './entity/User';

// Replace with your own API entrypoint
// For instance if https://example.com/api/books is the path to the collection of book resources, then the entrypoint is https://example.com/api
export default () => (
    <HydraAdmin entrypoint="http://karimmoussouni.local/api">
        <ResourceGuesser name="articles" />
        <ResourceGuesser name="clients" />
        <ResourceGuesser name="experiences" />
        <ResourceGuesser name="media_objects" />
        <ResourceGuesser name="projects" />
        <ResourceGuesser name="users" list={UsersList} create={UserCreate} />
    </HydraAdmin>
);