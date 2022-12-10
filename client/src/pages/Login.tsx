import React, { useState, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Authenticate } from '../modules/Auth';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import ErrorText from '../components/ErrorText';
import logging from '../Config/logging';
import CenterPiece from '../components/CenterPiece';
import LoadingComponents from '../components/LoadingComponents';
import UserContext from '../contexts/user';

function Login() {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const auth = getAuth();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const isLogin = window.location.pathname.includes('login');

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        console.log('response.user.uid', response.user.uid);
        console.log('response.user', response.user.displayName);
        let user = response?.user;

        if (user) {
          let uid = response?.user?.uid;
          let name = response?.user?.displayName;

          if (name) {
            try {
              let fire_token = await user.getIdToken();
              console.log('fire_token', fire_token);
              Authenticate(uid, name, fire_token, (error, _user) => {
                if (error) {
                  setError(error);
                  setAuthenticating(false);
                } else if (_user) {
                  userContext.userDispatch({
                    type: 'login',
                    payload: { user: _user, fire_token },
                  });
                  navigate('/');
                }
              });
            } catch (error) {
              setError('Invalid token.');
              logging.error(error);
              setAuthenticating(false);
            }
          } else {
            /**
             * We can set these manually with a new form
             * For example, the Twitter provider sometimes
             * does not provide a username as some users sign
             * up with a phone number.  Here you could ask
             * them to provide a name that would be displayed
             * on this website.
             * */
            console.log('name이 없는 것에 대한 에러로 이동함');
            setError('The identify provider is missing a display name.');
            setAuthenticating(false);
          }
        } else {
          console.log('user가 없어서 else 영역으로 이동함');
          setError(
            'The social media provider does not have enough information. Please try a different provider.'
          );
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        console.log('signInWithPopup이 catch 블락으로 이동함');
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <CenterPiece>
      <Card>
        <CardHeader>{isLogin ? 'Login' : 'Sign Up'}</CardHeader>
        <CardBody>
          <ErrorText error={error} />
          <Button
            block
            disabled={authenticating}
            onClick={() => signInWithGoogle()}
            style={{ backgroundColor: '#ea4335', borderColor: '#ea4335' }}
          >
            <i className="fab fa-google mr-2"></i> Sign {isLogin ? 'in' : 'up'}{' '}
            with Google
          </Button>
          {authenticating && <LoadingComponents card={false} />}
        </CardBody>
      </Card>
    </CenterPiece>
  );
}

export default Login;
