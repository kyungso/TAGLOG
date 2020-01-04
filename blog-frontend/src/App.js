import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <>
      <Helmet>
        <title>FAMLOG</title>
      </Helmet>
      <Route component={HomePage} path='/' exact />
      <Route component={PostListPage} path={['/posts/@:username', '/posts']} exact />
      <Route component={LoginPage} path='/login' />
      <Route component={RegisterPage} path='/register' />
      <Route component={WritePage} path='/posts/write' />
      <Route component={PostPage} path='/posts/@:username/:postId' />
    </>
  );
}

export default App;
