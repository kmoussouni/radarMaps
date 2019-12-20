import React from "react";
import {TextInput, EditGuesser, ShowGuesser} from "@api-platform/admin";
import {Create, List, TextField} from 'react-admin';

const QuotationsList = props => (
    <List {...props}>
        <TextInput source="subject" />
    </List>
);

const QuotationsCreate = props => (
    <Create {...props}>
        <TextInput source="title" />
        <TextInput source="user" />
        <TextInput source="image" />
        <TextInput source="title" />
        <TextInput source="slug" />
        <TextInput  source="body" />
        <TextInput source="section" />
        <TextInput source="backStory" />
        <TextInput source="speakable" />
        <TextInput source="wordCount" />
    </Create>
);

const QuotationsEdit = props => (
    <EditGuesser {...props}>
        <TextInput source="title" />
        <TextInput source="user" />
        <TextInput source="image" />
        <TextInput source="title" />
        <TextInput source="slug" />
        <TextInput source="body" />
        <TextInput source="section" />
        <TextInput source="backStory" />
        <TextInput source="speakable" />
        <TextInput source="wordCount" />
    </EditGuesser>
);

const QuotationsShow = props => (
    <ShowGuesser {...props}>
        <TextField source="title" addLabel={true} />
        <TextField source="user"  addLabel={true} />
        <TextField source="image"  addLabel={true} />
        <TextField source="title"  addLabel={true} />
        <TextField source="slug"  addLabel={true} />
        <TextField source="body"  addLabel={true} />
        <TextField source="section"  addLabel={true} />
        <TextField source="backStory"  addLabel={true} />
        <TextField source="speakable"  addLabel={true} />
        <TextField source="wordCount"  addLabel={true} />
    </ShowGuesser>
);

export {QuotationsList, QuotationsCreate, QuotationsEdit, QuotationsShow};
