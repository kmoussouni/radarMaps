import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";
// import { List, Datagrid, TextField, TextInput } from 'react-admin';
import { TextInput, ImageField } from 'react-admin';
// import { InputHelperText } from 'ra-ui-materialui';
// import RichTextInput from "ra-input-rich-text";
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

const ArticlesList = props => (
        <ListGuesser {...props}>
                <ImageField source="image" />
                <FieldGuesser source="title" inputProps={{ maxLength: 12 }} />
                <FieldGuesser source="createdAt" />
        </ListGuesser>
);

const ArticlesCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="title" />
        <ReferenceField
            source="user"
            // reference="user"
            label="User"
            filterToQuery={searchText => ({ email: searchText })} >
        <InputGuesser source="user" />
        </ReferenceField>
        <InputGuesser source="image" />
        <InputGuesser source="title" />
        <InputGuesser source="slug" />
        <TextInput  source="body" />
        <InputGuesser source="section" />
        <InputGuesser source="backStory" />
        <InputGuesser source="speakable" />
        <InputGuesser source="wordCount" />
    </CreateGuesser>
);

const ArticlesEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="title" />
        <InputGuesser source="user" />
        <InputGuesser source="image" />
        <InputGuesser source="title" />
        <InputGuesser source="slug" />
        <InputGuesser source="body" />
        <InputGuesser source="section" />
        <InputGuesser source="backStory" />
        <InputGuesser source="speakable" />
        <InputGuesser source="wordCount" />
    </EditGuesser>
);

const ArticlesShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="title" addLabel={true} />
        <FieldGuesser source="user"  addLabel={true} />
        <FieldGuesser source="image"  addLabel={true} />
        <FieldGuesser source="title"  addLabel={true} />
        <FieldGuesser source="slug"  addLabel={true} />
        <FieldGuesser source="body"  addLabel={true} />
        <FieldGuesser source="section"  addLabel={true} />
        <FieldGuesser source="backStory"  addLabel={true} />
        <FieldGuesser source="speakable"  addLabel={true} />
        <FieldGuesser source="wordCount"  addLabel={true} />
    </ShowGuesser>
);

export {ArticlesList, ArticlesCreate, ArticlesEdit, ArticlesShow};
