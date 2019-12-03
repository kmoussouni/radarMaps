import React from "react";
import {FieldGuesser, ListGuesser, CreateGuesser, InputGuesser, EditGuesser, ShowGuesser} from "@api-platform/admin";

const ArticlesList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="title" addLabel={true} />
    </ListGuesser>
);

const ArticlesCreate = props => (
    <CreateGuesser {...props}>
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
    </CreateGuesser>
);

const ArticlesEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="title" />
    </EditGuesser>
);

const ArticlesShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="title"  addLabel={true} />
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
