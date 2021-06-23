import React from 'react';

import PostList from '../components/PostList';
import Loader from '../components/Loader';

import Container from 'react-bootstrap/Container';

function HomeView(props) {
  let { posts, loading } = props;
  return (
    <Container fluid>
      <h1 className="text-center mt-3">Home</h1>
      <div className="posts-container d-flex flex-column align-items-center">
        {loading && (
          <>
            <div className="mt-4">
              <Loader />
            </div>
            <br />
          </>
        )}
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : loading ? (
          ''
        ) : (
          'Nothing here yet!'
        )}
      </div>
    </Container>
  );
}

export default HomeView;
