import React, {
  useContext,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import UserContext from '../contexts/user';
import logging from '../Config/logging';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface IAuthRoute {
  // children: ReactElement | null;
  // children: ReactElement | null;
  children: ReactNode;
}

function AuthRoute({ children }: IAuthRoute) {
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  // const { children } = props;
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [auth]);

  if (userContext.userState.user._id === '') {
    logging.info('Unauthorized, redirecting.');
  }

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      console.log('Unauthorized');
      navigate('/login');
    }
  });

  if (loading) return <p>loading...</p>;

  return <>{children}</>;
}

export default AuthRoute;
