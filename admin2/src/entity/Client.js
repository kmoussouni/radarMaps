import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const ClientsList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="name" addLabel={true} />
    </ListGuesser>
);

const ClientsCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" />
    </CreateGuesser>
);

const ClientsEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="name" />
    </EditGuesser>
);

const ClientsShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="name" />
    </ShowGuesser>
);

export {ClientsList, ClientsCreate, ClientsEdit, ClientsShow};
