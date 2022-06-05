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

  function addfilm(newFilm){
    console.log(newFilm);
    API.createFilm(newFilm).then( () => console.log("okay")).catch(e => console.log(e));
    //setFilms( Films=> [...Films, newFilm]);
    console.log(Films);
  }

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage films={Films} setFilms={setFilms} />} />
          <Route path="/:Filter" element={<LandingPage films={Films} setFilms={setFilms} />} />
          <Route path='/add' element={<AddFilmForm setFilms={addfilm} />} />
          <Route path='/edit/:FilmName' element={<EditFilmForm films={Films} setFilms={setFilms} />} />
        </Route>
      </Routes>
    </Router>


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
  const { Filter } = useParams(); //Parametro per impostare i filtri da url
  const [SelButton, setSelButton] = useState(Filter ? Filter : "All"); //Stato dei bottoni laterali
  let filtername = Filter ? Filter : 'All';
  const [dirty, setDirty] = useState(true);

  useEffect(() => {

    if (dirty && filtername ) {
      setTimeout(() => { API.getFilms(filtername).then(films => { props.setFilms(films); }).catch(e => console.log(e)); setDirty(false); }, 1000);
    }
  }, [dirty, SelButton]);

  function wrap(b) {
    setSelButton(b);
    setDirty(true);
  }

  return (
    dirty ? <h1> Loading...</h1> :
      <Row>
        <Col className="bg-light" md={3} id="aside">
          <br />
          <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={wrap} filter={Filter} />
        </Col>
        <Col md={9}>
          <br />
          <MyMain name={SelButton} films={props.films} setFilms={props.setFilms} filter={filtername} setDirty={setDirty}/>
        </Col>
      </Row>

  )
}




export default App;
