import './App.css';
import MyNav from "./MyNav.js";
import MyAside from './MyAside.js';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams ,useNavigate ,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyMain from './MyMain.js';
import AddFilmForm from './AddFilmForm';
import EditFilmForm from './EditFilmForm';
import { useEffect } from 'react';
import API from './API.js'
import {LoginForm,LogoutButton} from './LoginComponents'

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}
function App2() {
  const [Films, setFilms] = useState([]);//Stato con tutti i film
  const [dirty,setDirty]=useState(true);//è un flag che se io faccio cambiare mi ricarica la lista dal server
  const [loggedIn,setLoggedIn]=useState(false);
  const [user,setUser]=useState({});
  let navigate = useNavigate();

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        handleError(err);
      }
    };
    checkAuth();
  }, []);
 /* useEffect(() => {
    if (loggedIn)
      API.getAllFilms()
        .then( (films) => { setFilms(films); setDirty(true); } )
        .catch( err => handleError(err))
  }, [loggedIn])*/

  useEffect(()=>{
    //fetch /api/films
    //set films del risutlato
    if(dirty){
      console.log(loggedIn);
    API.getAllFilms().
    then((films)=>{
      setFilms(films);
      setDirty(false);
    }).
    catch(err=>console.log(err));}
    
  },[dirty,Films.length]);
  function handleError(err){
    console.log(err);
  }
  function updateFilm(film){
    setFilms(Films=>Films.map(
      f=>(f.id==film.id)?Object.assign({},film):f
    ));
      
      API.updateFilm(film)
      .then(()=>setDirty(true))
      .catch(err=>handleError(err));
  }
  function addFilm(film){
    console.log(film.title);
    setFilms(oldFilms=>[...oldFilms,film]);
    API.addFilm(film)
    .then(()=>setDirty(true))
    .catch(err=>handleError(err));
  }
  function deleteFilm(idFilm) {

    setFilms( Films => Films.filter(e=>e.id!=idFilm));
    console.log(dirty);
    API.deleteFilm(idFilm)
      .then( ()=> {
        setDirty(true);
      })
      .catch( err => handleError(err));
  }
  const doLogin=(credentials)=>{
    API.logIn(credentials)
    .then(user=>{
      setLoggedIn(true);
        setUser(user);
        //setMessage('');
        navigate('/');;

    })
    .catch();
  }
  const  doLogOut=async ()=>{
    await API.logOut();
    setLoggedIn(false);
    setUser({});
    setFilms([]);
    navigate('/');

  }
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={loggedIn ?<LandingPage films={Films} setFilms={setFilms} updateFilm={updateFilm} deleteFilm={deleteFilm} loggedIn={loggedIn} doLogOut={doLogOut} user={user} />:<Navigate to ='/login'/>} />
          <Route path="/:Filter" element={<LandingPage films={Films} setFilms={setFilms} updateFilm={updateFilm} deleteFilm={deleteFilm} loggedIn={loggedIn} doLogOut={doLogOut} user={user}/>} />
          <Route path='/add' element={<AddFilmForm addFilm={addFilm} />} />
          <Route path='/edit/:FilmId' element={<EditFilmForm films={Films} setFilms={updateFilm} />} />
          <Route path='/login' element={<LoginForm login={doLogin}/>}/>
        </Route>
      </Routes>

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
  const setFilms=props.setFilms;
  const Films=props.films;
  const Filtro=SelButton.replace(" ","");
  console.log(Filtro);
 useEffect(()=>{
    //fetch /api/films
    //set films del risutlato
    API.getFilms(SelButton.replace(" ","")).then((Films)=>setFilms(Films)).catch(err=>console.log(err));
  },[SelButton])
  let filtername = Filter ; 
  return (
    <Row>
      <Col className="bg-light" md={3} id="aside">
        {props.loggedIn? <LogoutButton logout={props.doLogOut} user={props.user}/>:false}
        <br />
        <MyAside bottoni={button_list} SelButton={SelButton} setSelButton={setSelButton} filter={Filter} />
      </Col>
      <Col md={9}>
        <br />
        <MyMain name={SelButton} films={props.films} updateFilm={props.updateFilm} filter={filtername} deleteFilm={props.deleteFilm} />
      </Col>
    </Row>
  )
}

export default App;