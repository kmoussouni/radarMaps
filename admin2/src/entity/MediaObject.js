import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";
import {TextField, ImageInput, ImageField} from "react-admin";

const MediaObjectsList = props => (
    <ListGuesser {...props}>
        <TextField source="user.email" addLabel={true} />
        {/*<ImageInput source="file" label="Image" accept="image/*">*/}
        <ImageField source="file" addLabel={true} />
        {/*</ImageInput>*/}
        <FieldGuesser source="filePath" addLabel={true} />
    </ListGuesser>
);

const MediaObjectsCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="user" />
    </CreateGuesser>
);

const MediaObjectsEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="user" />
        <InputGuesser source="contentUrl" />
        <ImageInput source="file" label="Image" accept="image/*">
            <ImageField source="src" title="file" />
        </ImageInput>
        <InputGuesser source="filePath" />
    </EditGuesser>
);

const MediaObjectsShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="user" />
        <FieldGuesser source="contentUrl" />
        <ImageField source="file" />
        <ImageField source="filePath" />
    </ShowGuesser>
);

export {MediaObjectsList, MediaObjectsCreate, MediaObjectsEdit, MediaObjectsShow};
