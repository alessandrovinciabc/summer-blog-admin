import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { getComments, deleteComment } from '../util/apiOperations';
import jwt from '../util/jwt';
import convertToHTML from '../util/converter';
import sanitizer from '../util/sanitizer';

function PostView(props) {
  let { id } = useParams();
  let [comments, setComments] = useState([]);
  let [post, setPost] = useState(null);
  let [converted, setConverted] = useState('');

  let { posts, loading } = props;

  useEffect(() => {
    if (id == null) return;
    if (posts.length === 0) return;

    let matchingPost = posts.find((post) => post._id === id);
    setPost(matchingPost);

    let parsedJSON = JSON.parse(matchingPost.json);
    setConverted(sanitizer(convertToHTML(parsedJSON.blocks)));

    getComments(id)
      .then((newComments) => {
        setComments(newComments.data);
      })
      .catch((err) => {
        if (err.response.status === 404) return;
      });
  }, [id, posts]);

  return (
    <Container className="d-flex justify-content-center" fluid>
      {post ? (
        <div className="post mt-4">
          <Button
            onClick={() => {
              window.location.hash = `#/post/${id}/edit`;
            }}
          >
            Edit🖊
          </Button>
          <h1>{post.title}</h1>
          <p className="text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: converted,
            }}
          ></div>
          <section className="comments my-5 pt-3 border-top">
            <header>
              <h2>Comments</h2>
            </header>
            <div>
              {comments.length > 0
                ? comments.map((comment) => {
                    return (
                      <Card
                        key={comment._id}
                        className="post-summary my-3 w-100 pr-5"
                      >
                        <Card.Body className="pb-4 position-relative">
                          <Card.Title>{comment.owner}</Card.Title>
                          {comment.text}
                          <div className="text-muted position-absolute comment-time">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </Card.Body>
                        <Button
                          onClick={() => {
                            deleteComment(id, comment._id, jwt.get())
                              .then(() => {
                                window.location.reload();
                              })
                              .catch(() => {});
                          }}
                          className="delete-btn rounded-right-only"
                          variant="danger"
                        >
                          X
                        </Button>
                      </Card>
                    );
                  })
                : 'Nothing here yet'}
            </div>
          </section>
        </div>
      ) : loading ? (
        <div className="mt-4">
          <Loader />
        </div>
      ) : (
        <div className="mt-4">Post was not found.</div>
      )}
    </Container>
  );
}

export default PostView;
