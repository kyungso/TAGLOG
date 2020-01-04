import React from 'react';
import Logo from '../components/common/Logo';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
      <>
      <Logo />
      <Responsive>
        <Helmet>
          <title>글 작성하기 - FAMLOG</title>
        </Helmet>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
      </>
    );
};

export default WritePage;