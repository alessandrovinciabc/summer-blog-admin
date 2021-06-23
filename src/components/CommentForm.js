import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { postComment } from '../util/apiOperations';

function handleSubmit(e, id) {
  e.preventDefault();

  let { owner, text } = e.target.elements;
  owner = owner.value;
  text = text.value;

  postComment(id, { owner, text }).then(() => {
    window.location.reload();
  });
}

function CommentForm(props) {
  let { id } = props;
  return (
    <Form
      className="border-bottom pb-3"
      onSubmit={(e) => {
        handleSubmit(e, id);
      }}
      action={`http://localhost:3000/blog/post/${id}/comment`}
      method="POST"
    >
      <Form.Group controlId="formName">
        <Form.Label>Your name</Form.Label>
        <Form.Control
          name="owner"
          type="text"
          required
          maxLength="20"
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control
          name="text"
          className="new-comment-textarea"
          as="textarea"
          required
          maxLength="255"
          autoComplete="off"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CommentForm;
