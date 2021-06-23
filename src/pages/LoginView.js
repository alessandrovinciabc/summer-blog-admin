import Loader from '../components/Loader';
import Container from 'react-bootstrap/Container';

import LoginForm from '../components/LoginForm';

function LoginView(props) {
  let { loading, setAuth } = props;

  return (
    <Container className="d-flex justify-content-center" fluid>
      <div className="mt-4">
        <h1>Login</h1>
        {loading ? (
          <div className="mt-4">
            <Loader />
          </div>
        ) : (
          <LoginForm setAuth={setAuth} />
        )}
      </div>
    </Container>
  );
}

export default LoginView;
