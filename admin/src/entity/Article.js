import React from "react";
import {ListGuesser, CreateGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";
import {FieldGuesser, InputGuesser} from "@api-platform/admin";
// import {SimpleForm} from 'react-admin';
import {SimpleForm} from 'react-admin';
// import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';

const ArticlesList = props => (
    <ListGuesser {...props}>
        {/*<FieldGuesser source="body" />*/}
        <FieldGuesser source="title" />
        <FieldGuesser source="subtitle" />
        <FieldGuesser source="createdAt" />
        <FieldGuesser source="updatedAt" />
    </ListGuesser>
);

const ArticlesCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="title" />
        <InputGuesser source="subtitle" />
        <InputGuesser source="slug" />
        <InputGuesser source="body" />
        <InputGuesser source="section" />
        <InputGuesser source="backStory" />
    </CreateGuesser>
);

const ArticlesEdit = props => (
    <EditGuesser {...props}>
    </EditGuesser>
);

const ArticlesShow = props => (
    <ShowGuesser {...props}>
    </ShowGuesser>
);

export {ArticlesList, ArticlesCreate, ArticlesEdit, ArticlesShow};
