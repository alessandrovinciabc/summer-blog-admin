import React from 'react';

import Card from 'react-bootstrap/Card';

function PostList(props) {
  let { posts } = props;
  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          return (
            <a
              key={post._id}
              className="text-reset post-link"
              href={`#/post/${post._id}`}
            >
              <Card className="post-summary my-3 mx-auto">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </a>
          );
        })}
    </>
  );
}

export default PostList;
