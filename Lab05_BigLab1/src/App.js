import './App.css';
import MyNav from "./MyNav.js";
import MyAside from './MyAside.js';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet , useParams} from 'react-router-dom';
import dayjs from 'dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain.js';
import AddFilmForm from './AddFilmForm';
import EditFilmForm from './EditFilmForm';


let fakeFilms = [
  { nome: 'Pulp Fiction', favorite: true, score: 5, date: dayjs('2022-03-20') },
  { nome: '21 Grams', favorite: true, score: 4, date: dayjs('2022-03-11') },
  { nome: 'Star Wars', favorite: false, score: 0, date: undefined },
  { nome: 'Matrix', favorite: false, score: 0, date: undefined },
  { nome: 'Shrek', favorite: false, score: 3, date: dayjs('2022-03-21') },
  { nome: 'Shrek 3', favorite: false, score: 3, date: dayjs('2022-05-01') }

];

function App() {
  const [Films, setFilms] = useState(fakeFilms);

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage films={Films} setFilms={setFilms} />} />
          <Route path="/:Filter" element={<LandingPage films={Films} setFilms={setFilms} />} />
          <Route path='/add' element={<AddFilmForm setFilms={setFilms} />} />
          <Route path='/edit/:FilmName' element={<EditFilmForm films={Films} setFilms={setFilms}/>} />
        </Route>
      </Routes>
    </Router>

  );
}

function Layout() {//Layout generale delle pagine
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
  const [SelButton, setSelButton] = useState("All"); //Stato dei bottoni
  const { Filter } = useParams(); //Filtro passato come parametro nell'indirizzo
  let filtername = Filter? Filter : 'All';
  return (
    <Row>
      <Col className="bg-light" md={3} id="aside">
        <br />
        <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={setSelButton} filter = {Filter}/>
      </Col>
      <Col md={9}>
        <br />
        <MyMain name={SelButton} films={props.films} setFilms={props.setFilms} filter = {filtername}/>
      </Col>
    </Row>
  )
}

export default App;
