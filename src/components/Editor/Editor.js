import EditorJS from '@editorjs/editorjs';

/* Tools */
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';

import React, { useEffect, useRef } from 'react';

const Editor = React.forwardRef((props, ref) => {
  let editor = useRef();
  let editorContainer = useRef();

  useEffect(() => {
    const editorjs = new EditorJS({
      placeholder: 'Type something...',
      data: props.data ?? {},
      holder: editorContainer.current,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        image: SimpleImage,
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
      },
    });

    editor.current = editorjs;
  }, [props.data]);

  useEffect(() => {
    ref.current = editor.current;
  }, [ref]);

  return <div ref={editorContainer}></div>;
});

export default Editor;
