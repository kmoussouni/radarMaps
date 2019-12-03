import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const UsersList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="username" addLabel={true} />
        <FieldGuesser source="firstname" addLabel={true} />
        <FieldGuesser source="lastname" addLabel={true} />

        {/* While deprecated fields are hidden by default, using an explicit FieldGuesser component allows to add them back. */}
        <FieldGuesser source="email" />
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
        <InputGuesser source="username" />
    </EditGuesser>
);

const UsersShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="username" />
    </ShowGuesser>
);

export {UsersList, UsersCreate, UsersEdit, UsersShow};
