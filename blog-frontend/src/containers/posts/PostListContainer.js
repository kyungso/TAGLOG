import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/posts/PostList';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
  }));

  useEffect(() => {
    const { page, username, tag } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ page, username, tag }));
  }, [dispatch, location.search]);
  return (
    <PostList 
      posts={posts} 
      loading={loading} 
      error={error} 
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);