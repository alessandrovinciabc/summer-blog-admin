import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { login } from '../util/apiOperations';
import jwt from '../util/jwt';

function LoginForm(props) {
  let [failed, setFailed] = useState(false);

  let { setAuth } = props;

  function handleSubmit(e) {
    e.preventDefault();

    let { username, password } = e.target.elements;
    username = username.value;
    password = password.value;

    login(username, password)
      .then((result) => {
        jwt.save(result.data.jwt);
        setAuth(result);
        window.location.hash = '#/';
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) return setFailed(true);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          required
          maxLength="20"
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          required
          maxLength="100"
          autoComplete="off"
        />
      </Form.Group>
      <Button className="d-block mx-auto" variant="primary" type="submit">
        Submit
      </Button>
      {failed && (
        <Alert className="mt-3" variant="danger">
          Invalid username or password
        </Alert>
      )}
    </Form>
  );
}

export default LoginForm;
