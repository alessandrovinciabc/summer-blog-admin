import React, { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import Loader from '../components/Loader';
import Editor from '../components/Editor/Editor';

function CreateView(props) {
  let [titleInput, setTitleInput] = useState('');

  let [isSaving, setIsSaving] = useState(false);
  let editorRef = useRef();

  async function handleSave(e) {
    e.preventDefault();
    setIsSaving(true);

    let data;
    try {
      data = await editorRef.current.save();
    } catch (err) {
      alert('An error occurred');
    }

    /* TODO: save data to DB */
    console.log(data);

    setIsSaving(false);
  }

  function resetEditor() {
    setTitleInput('');
    editorRef.current.blocks.clear();
  }

  return (
    <Container fluid>
      <h1 className="text-center mt-3">Create</h1>
      <div className="d-flex flex-column align-items-center">
        {isSaving && (
          <div className="my-4">
            <Loader />
          </div>
        )}
        <br />
        <Form
          onSubmit={handleSave}
          className="w-100 d-flex flex-column align-items-center"
        >
          <Form.Control
            name="title"
            type="text"
            required
            maxLength="60"
            autoComplete="off"
            className="title-input"
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />

          <div className="mt-4">
            <Button type="submit" className="mr-3" variant="warning">
              Add Post to Blog
            </Button>
            <Button onClick={resetEditor} variant="danger">
              Reset
            </Button>
          </div>
        </Form>
      </div>
      <Container fluid className="mt-4">
        <Editor ref={editorRef} />
      </Container>
    </Container>
  );
}

export default CreateView;
