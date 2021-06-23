import React from 'react';

import Container from 'react-bootstrap/Container';

function AboutView(props) {
  return (
    <Container className="text-center mt-3" fluid>
      <h1>About</h1>
      <p>
        Well, what can I say? This is a blog and we're in the summer
        <br /> (yes, all year round😛)
      </p>
    </Container>
  );
}

export default AboutView;
