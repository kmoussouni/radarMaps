import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const ExperiencesList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="title" addLabel={true} />
    </ListGuesser>
);

const ExperiencesCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="title" />
    </CreateGuesser>
);

const ExperiencesEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="title" />
    </EditGuesser>
);

const ExperiencesShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="title" />
    </ShowGuesser>
);

export {ExperiencesList, ExperiencesCreate, ExperiencesEdit, ExperiencesShow};
