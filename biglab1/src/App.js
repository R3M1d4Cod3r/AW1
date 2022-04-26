import './App.css';
import MyButton from "./MyButton.js";
import MyNav from "./MyNav.js";
import MyAside from './aside';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  let button_list = ["All", "Favorite", "Best Rated", "Last Seen", "Seen Last Month", "Unseen"];
  return (
    <>
    <MyNav />
    <Container fluid>
      <Col variant="bg-light" md={2}>
        <MyAside bottoni={button_list}/>
      </Col>
    </Container>
    </>

    

  );
}

export default App;
