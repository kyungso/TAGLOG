import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 2rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.1125rem;
  color: ${palette.gray[8]};
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }
  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 16px;
    margin-inline-start: 5px;
    margin-inline-end: 5px;
  }
  pre {
    background-color: #f0f0f0;
    border-radius: 3px;
    white-space: pre-wrap;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 10px 15px;
    .ql-syntax {
      background-color: #23241f;
      color: #f8f8f2;
      overflow: visible;
    }
  }
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if(error) {
    if(error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>
  }

  if(loading || !post) {
    return null;
  }

  const { title, body, user, publishedDate, tags } = post;
  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title.length < 11 ? title : `${title.slice(0, 10)}...`} - FAMLOG</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo 
          username={user.username} 
          publishedDate={publishedDate}
          hasMarginTop
        />
        <Tags tags={tags}/>
      </PostHead>
      {actionButtons}
      {console.log(body)}
      <PostContent
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </PostViewerBlock>
  ); 
};

export default PostViewer;