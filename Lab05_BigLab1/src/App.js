import './App.css';
import MyNav from "./MyNav.js";
import MyAside from './MyAside.js';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import dayjs from 'dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain.js';
import AddFilmForm from './AddFilmForm';


let fakeFilms = [
  { nome: 'Pulp Fiction', favorite: true, score: 5, date: dayjs('2022-03-20') },
  { nome: '21 Grams', favorite: true, score: 4, date: dayjs('2022-03-11') },
  { nome: 'Star Wars', favorite: false, score: 0, date: '' },
  { nome: 'Matrix', favorite: false, score: 0, date: '' },
  { nome: 'Shrek', favorite: false, score: 3, date: dayjs('2022-03-21') }

];

function App() {
  const [Films, setFilms] = useState(fakeFilms);
  
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LandingPage films={Films} setFilms={setFilms}/>}/>
            <Route path='/add' element={<AddFilmForm setFilms={setFilms}/>}/>
          </Route>
        </Routes>
      </Router>
  
  );
}

function Layout() {
  return (
    <>
      <MyNav />
      <Container fluid>
        <Outlet />
      </Container>
    </>

  )
}

function LandingPage(props) {
  let button_list = ["All", "Favorite", "Best Rated", "Seen Last Month", "Unseen"];
  const [SelButton, setSelButton] = useState("All");
  return (
    <Row>
      <Col className="bg-light" md={3} id="aside">
        <br />
        <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={setSelButton} />
      </Col>
      <Col md={9}>
        <br />
        <MyMain name={SelButton} films={props.films} setFilms={props.setFilms}/>
      </Col>
    </Row>
  )
}

export default App;
