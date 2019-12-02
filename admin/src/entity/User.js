import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser} from "@api-platform/admin";

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

const UserCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="author" />
        <InputGuesser source="book" />
        <InputGuesser source="rating" />

        {/* While deprecated fields are hidden by default, using an explicit InputGuesser component allows to add them back. */}
        <InputGuesser source="letter" />

        <InputGuesser source="body" />
        <InputGuesser source="publicationDate" />
    </CreateGuesser>
);

export default {UsersList, UserCreate};