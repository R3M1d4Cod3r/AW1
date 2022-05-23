import './App.css';
import MyNav from "./MyNav.js";
import MyAside from './MyAside.js';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain.js';
import AddFilmForm from './AddFilmForm';
import EditFilmForm from './EditFilmForm';
import API from './API';


function App() {
  const [Films, setFilms] = useState([]);//Stato con tutti i film
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LandingPage films={Films} setFilms={setFilms} />} />
            <Route path="/:Filter" element={<LandingPage films={Films} setFilms={setFilms} />} />
            <Route path='/add' element={<AddFilmForm setFilms={setFilms} />} />
            <Route path='/edit/:FilmName' element={<EditFilmForm films={Films} setFilms={setFilms} />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>

  );
}

function Layout() {//Layout generale per tutte le pagine
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
  const [SelButton, setSelButton] = useState("All"); //Stato dei bottoni laterali
  const { Filter } = useParams(); //Parametro per impostare i filtri da url
  let filtername = Filter ? Filter : 'All';

  useEffect(() => {
    API.getFilms(filtername).then(films => { props.setFilms(films); console.log(films); }).catch(e => console.log(e));

  }, [SelButton]);

  return (
    <Row>
      <Col className="bg-light" md={3} id="aside">
        <br />
        <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={setSelButton} filter={Filter} />
      </Col>
      <Col md={9}>
        <br />
        <MyMain name={SelButton} films={props.films} setFilms={props.setFilms} filter={filtername} />
      </Col>
    </Row>
  )
}

export default App;
