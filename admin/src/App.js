// export default App;
import React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";

// Replace with your own API entrypoint
// For instance if https://example.com/api/books is the path to the collection of book resources, then the entrypoint is https://example.com/api
export default () => (
    <HydraAdmin entrypoint="http://karimmoussouni.local">
        <ResourceGuesser name="articles" />
        <ResourceGuesser name="projects" />
        <ResourceGuesser name="media_objects" />
        <ResourceGuesser name="quotations" />
        <ResourceGuesser name="users" />
    </HydraAdmin>
);