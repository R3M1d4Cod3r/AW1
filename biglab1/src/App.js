import './App.css';

import MyNav from "./MyNav.js";
import MyAside from './MyAside';
import { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain';

function App() {
  let button_list = ["All", "Favorite", "Best Rated", "Last Seen", "Seen Last Month", "Unseen"];
  const [SelButton, setSelButton] = useState("All");
  return (
    <>
      <MyNav />

      <Container fluid>
        <Row>
          <Col className="bg-light" md={3} id="aside">
            <br />
            <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={setSelButton} />
          </Col>
          <Col md={9}>
            <br />
            <MyMain name={SelButton} />
          </Col>
        </Row>
      </Container>
    </>



  );
}

export default App;
