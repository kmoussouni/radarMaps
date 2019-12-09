import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const UsersList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="username"/>
        <FieldGuesser source="email" addLabel={true} />
        <FieldGuesser source="enabled" addLabel={true} />

        {/* While deprecated fields are hidden by default, using an explicit FieldGuesser component allows to add them back. */}
        <FieldGuesser source="createdAt" />
    </ListGuesser>
);

const UsersCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="username" />
    </CreateGuesser>
);

const UsersEdit = props => (
    <EditGuesser {...props}>

        <InputGuesser source="username" addLabel={true} />
        <InputGuesser source="email" addLabel={true} />
        <InputGuesser source="enabled" addLabel={true} />

    </EditGuesser>
);

const UsersShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="username" addLabel={true} />
        <FieldGuesser source="email" addLabel={true} />
        <FieldGuesser source="enabled" addLabel={true} />
    </ShowGuesser>
);

export {UsersList, UsersCreate, UsersEdit, UsersShow};
