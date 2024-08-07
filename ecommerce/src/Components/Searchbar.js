import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';  // Import the logout icon
import { FaCartShopping } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth } from '../context/AuthContext.js';

import './Searchbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Searchbar() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleUserIconClick = () => {
    navigate('/userProfile');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='searchbar'>
      <Form inline>
        <Row>
          <Col xs="auto">
            <div>
              <FaUser className='user_icon' onClick={handleUserIconClick} />
              <FaCartShopping className='cart_icon' onClick={handleShow} />
              <FaSignOutAlt className='logout_icon' onClick={handleLogoutClick} />  {/* Add logout icon */}

              <Offcanvas show={show} onHide={handleClose} backdrop="static" placement='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <Container className="mt-5">
                      {user ? (
                        <Card>
                          <Card.Header as="h1" className="text-center">Cart Item</Card.Header>
                          <Card.Body>
                            <Row style={{ fontSize: "18px", height: "60vh" }}>
                              <Col md={18}>
                                <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
                                <Card.Text><strong>Address:</strong> {user.address}</Card.Text>
                                <Card.Text><strong>Shipped:</strong> {user.ship || "Not Ship"}</Card.Text>
                                <Card.Text><strong>Cart Total Amount:</strong> {user.cart?.totalAmount || '0'}</Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ) : (
                        <Alert variant="warning" className="text-center">
                          No user information available
                        </Alert>
                      )}
                    </Container>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
