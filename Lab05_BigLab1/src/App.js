import './App.css';
import MyNav from "./MyNav.js";
import MyAside from './MyAside';
import { useState } from 'react';
import dayjs from 'dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain';


let fakeFilms = [
  { nome: 'Pulp Fiction', favorite: true, score: 5, date: dayjs('2022-03-20') },
  { nome: '21 Grams', favorite: true, score: 4, date: dayjs('2022-03-11') },
  { nome: 'Star Wars', favorite: false, score: 0, date: '' },
  { nome: 'Matrix', favorite: false, score: 0, date: '' },
  { nome: 'Shrek', favorite: false, score: 3, date: dayjs('2022-03-21') }

];

function App() {
  let button_list = ["All", "Favorite", "Best Rated", "Seen Last Month", "Unseen"];

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
            <MyMain name={SelButton} films={fakeFilms} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
