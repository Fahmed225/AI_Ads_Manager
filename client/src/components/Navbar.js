import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUnauthenticated } from '../actions/authActions';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(setUnauthenticated());
    navigate('/signin');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">AI_Ads_Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              {/* Links for authenticated users */}
              {/* Add Nav.Link or other elements that are specific to authenticated users */}
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="#" onClick={handleSignOut}>Sign Out</Nav.Link>
            </>
          ) : (
            <>
              {/* Links for unauthenticated users */}
              <Nav.Link as={NavLink} to="/signin">Sign In</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
              {/* More Nav.Link or other elements here, based on isAuthenticated state */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
