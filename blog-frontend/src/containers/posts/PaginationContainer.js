import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = ({ location }) => {
  const { posts, lastPage, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    lastPage: posts.lastPage,
    loading: loading['posts/LIST_POSTS'],
  }));

  if(!posts || loading) return null;

  const { page = 1, username, tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return (
    <Pagination 
      page={parseInt(page, 10)}
      lastPage={lastPage}
      username={username}
      tag={tag}
    />
  );
};

export default withRouter(PaginationContainer);