import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';

import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Home = () => (
  <MainLayout>
      <Jumbotron className="bg-light">
          <Container>
              <Row>
                  <Col md={6} className="my-auto">
                      <h1><b>Build and Share Custom Restaurant Guides</b></h1>
                      <h5 className="mt-4 mb-4">Share your must-have meals at your go-to spots with your day-one peeps</h5>
                      <br/>
                      <Button href="/places" variant="standard" size="lg">
                          Build Menu
                      </Button>
                  </Col>
                  <br />
                  <Col md={6}>
                      <Image src="https://c.tenor.com/4EauhAI5810AAAAC/lets-order-menu.gif" rounded fluid />
                  </Col>
              </Row>
          </Container>
      </Jumbotron>
  </MainLayout>

);

export default Home;