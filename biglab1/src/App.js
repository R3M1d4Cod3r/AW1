import logo from './logo.svg';
import './App.css';
import MyButton from "./MyButton.js";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col>
            <h1>Hello world</h1>
            <MyButton ciao={4765} />
        </Col>
      </Row>
    </Container>

  );
}

export default App;
