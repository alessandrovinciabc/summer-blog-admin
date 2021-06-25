import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Editor from '../components/Editor/Editor';

import { putPost } from '../util/apiOperations';
import jwt from '../util/jwt';

function EditView(props) {
  let { id } = useParams();
  let [post, setPost] = useState(null);
  let [titleInput, setTitleInput] = useState(null);

  let [isSaving, setIsSaving] = useState(false);
  let editorRef = useRef();

  let { posts, loading } = props;

  useEffect(() => {
    if (id == null) return;
    if (posts.length === 0) return;

    let matchingPost = posts.find((post) => post._id === id);
    setPost(matchingPost);
    setTitleInput(matchingPost.title);
  }, [id, posts]);

  async function handleSave(e) {
    e.preventDefault();

    setIsSaving(true);

    let data;
    try {
      data = await editorRef.current.save();
      await putPost(
        id,
        { title: titleInput, json: JSON.stringify(data) },
        jwt.get()
      );

      window.location.hash = `#/post/${id}`;
      window.location.reload();
    } catch (err) {
      alert('An error occurred');
    }

    setIsSaving(false);
  }

  function handleCancel() {
    window.location.hash = `#/post/${id}`;
  }

  return (
    <Container className="d-flex justify-content-center" fluid>
      {post ? (
        <div className="post mt-4">
          <Form onSubmit={handleSave}>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="danger" className="w-25 mr-3">
                Save
              </Button>
              <Button onClick={handleCancel} variant="primary" className="w-25">
                Cancel
              </Button>
            </div>

            <div className="d-flex flex-column align-items-center">
              {isSaving && (
                <div className="my-4">
                  <Loader />
                </div>
              )}
            </div>

            <Form.Control
              type="text"
              required
              maxLength="60"
              autoComplete="off"
              className="title-input my-3 edit-title-input"
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
          </Form>

          <p className="text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

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
