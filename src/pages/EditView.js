import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Editor from '../components/Editor/Editor';

function EditView(props) {
  let { id } = useParams();
  let [post, setPost] = useState(null);

  let [isSaving, setIsSaving] = useState(false);
  let editorRef = useRef();

  let { posts, loading } = props;

  useEffect(() => {
    if (id == null) return;
    if (posts.length === 0) return;

    let matchingPost = posts.find((post) => post._id === id);
    setPost(matchingPost);
  }, [id, posts]);

  function handleCancel() {
    window.location.hash = `#/post/${id}`;
  }

  return (
    <Container className="d-flex justify-content-center" fluid>
      {post ? (
        <div className="post mt-4">
          <div className="d-flex justify-content-center">
            <Button variant="danger" className="w-25 mr-3">
              Save
            </Button>
            <Button onClick={handleCancel} variant="primary" className="w-25">
              Cancel
            </Button>
          </div>

          <h1>{post.title}</h1>
          <p className="text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="d-flex flex-column align-items-center">
            {isSaving && (
              <div className="my-4">
                <Loader />
              </div>
            )}
          </div>
          <Container fluid className="mt-4">
            <Editor ref={editorRef} data={JSON.parse(post.json)} />
          </Container>
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

export default EditView;
