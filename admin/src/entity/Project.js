import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const ProjectsList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="title" addLabel={true} />
    </ListGuesser>
);

const ProjectsCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="title" />
    </CreateGuesser>
);

const ProjectsEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="title" />
    </EditGuesser>
);

const ProjectsShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="title" />
    </ShowGuesser>
);

export {ProjectsList, ProjectsCreate, ProjectsEdit, ProjectsShow};
