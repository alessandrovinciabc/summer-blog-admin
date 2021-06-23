import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { getPosts } from './util/apiOperations';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

//Pages
import PostView from './pages/PostView';
import HomeView from './pages/HomeView';
import AboutView from './pages/AboutView';

import LoginView from './pages/LoginView';

import jwt from './util/jwt';
import { testAuth } from './util/apiOperations';

function App() {
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  let [auth, setAuth] = useState(null);

  useEffect(() => {
    getPosts()
      .then((newPosts) => {
        setPosts(newPosts.data);
      })
      .finally(() => {
        setLoading(false);
      });

    let jwtFromStorage = jwt.get();

    if (jwtFromStorage == null) return;

    testAuth(jwtFromStorage)
      .then((res) => {
        setAuth(jwtFromStorage);
      })
      .catch((err) => {});
  }, []);

  return (
    <HashRouter>
      <Header className="bg-header" />
      <Switch>
        <Route path="/login" exact>
          {auth && <Redirect to="/" />}
          <LoginView setAuth={setAuth} loading={loading} />
        </Route>
        {auth == null && <Redirect to="/login" />}

        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomeView posts={posts} loading={loading} />
        </Route>
        <Route path="/about" exact component={AboutView} />
        <Route path="/post/:id" exact>
          <PostView posts={posts} loading={loading} />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
