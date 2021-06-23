import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { deletePost } from '../util/apiOperations';
import jwt from '../util/jwt';

function deletePostAndRefresh(postid) {
  deletePost(postid, jwt.get())
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {});
}

function PostList(props) {
  let { posts } = props;
  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          return (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <Card className="post-summary my-3 mx-auto pr-5">
                <a
                  key={post._id}
                  className="text-reset post-link"
                  href={`#/post/${post._id}`}
                >
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Card.Subtitle>
                  </Card.Body>
                </a>

                <Button
                  onClick={() => {
                    deletePostAndRefresh(post._id);
                  }}
                  className="delete-btn rounded-right-only"
                  variant="danger"
                >
                  X
                </Button>
              </Card>
            </div>
          );
        })}
    </>
  );
}

export default PostList;
