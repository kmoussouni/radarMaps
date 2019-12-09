import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";
import {ImageInput, ImageField} from "react-admin";

const MediaObjectsList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="user" addLabel={true} />
        <FieldGuesser source="file" addLabel={true} />
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
        <ImageInput source="file" label="Imgage" accept="image/*">
            <ImageField source="file" title="file" />
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
