import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Button,
  NavbarText,
} from 'reactstrap';
import UserContext from '../contexts/user';
import { getAuth, signOut } from 'firebase/auth';
import AuthRoute from './AuthRoute';

export interface INavigationProps {}

function Navigation(props: any) {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;
  const auth = getAuth();

  console.log('navigate, logout auth', auth);

  const logout = () => {
    userContext.userDispatch({
      type: 'logout',
      payload: userContext.userState,
    });
  };

  return (
    <AuthRoute>
      <Navbar color="light" light sticky="top" expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            📝
          </NavbarBrand>
          <Nav className="mr-auto" navbar></Nav>
          <Button outline size="sm" onClick={() => signOut(auth)}>
            socialLogout
          </Button>
          {user._id !== '' ? (
            <div>
              <Button outline tag={Link} to="/edit">
                <i className="far fa-sticky-note mr-2"></i>
                Post a Blog
              </Button>
              <NavbarText className="ml-2 mr-2">|</NavbarText>
              <Button outline size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <NavbarText tag={Link} to="/login">
                Login
              </NavbarText>
              <NavbarText className="ml-2 mr-2">|</NavbarText>
              <NavbarText tag={Link} to="/register">
                Signup
              </NavbarText>
            </div>
          )}
        </Container>
      </Navbar>
    </AuthRoute>
  );
}

export default Navigation;
