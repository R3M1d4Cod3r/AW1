import { useState } from 'react';
import { Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate, useParams } from 'react-router-dom';
import API from './API.js';

//Componente che si occupa dell'edit di un film alla lista
function EditFilmForm(props) {
    const navigate = useNavigate();
    const { FilmName } = useParams();

    const films = props.films;
    const setFilms = props.setFilms;

    const FilmToEdit = films.find((f) => f.title === FilmName);



    const [name, setName] = useState(FilmToEdit.title);
    const [favorite, setFavorite] = useState(FilmToEdit.favorite);
    const [date, setDate] = useState(FilmToEdit.watchdate ? FilmToEdit.watchdate : dayjs());
    const [score, setScore] = useState(FilmToEdit.rating);
    const [errorMsg, setErrorMsg] = useState('');



    const handleSubmit = (event) => {
        event.preventDefault();
        if (score >= 0 && score <= 5 && name !== '' && !date.isAfter(dayjs())) { // Controllo se la sottomissione del form è corretta

            const newFilm = {id:FilmToEdit.id, title: name, favorite: favorite, watchdate: date.isValid() ? date : null, rating : score };
            /*setFilms(() => films.map(f => {
                if (f.title === FilmToEdit.title) {
                    return newFilm
                }
                return f;
            }));*/
            API.updateFilm(newFilm).then( () => console.log("okay")).catch(e => console.log(e));
            navigate('/')
        }
        //Gestione degli errori
        else if (score < 0 || score > 5) {
            setErrorMsg('Errore voto: ' + score);
        }
        else if (name === '') {
            setErrorMsg('Errore campo nome vuoto');
        }
        else if (date.isAfter(dayjs())) {
            setErrorMsg('Errore la data di visione non può essere futura');
        }
    }

    return (<Row><Col><br />
        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}

        <Form>
            <Form.Group>
                <Form.Label><h1>Name: {FilmToEdit.title} </h1></Form.Label>
                <Form.Control value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
            </Form.Group>
            <Form.Label>Favorite:</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" value={favorite} onChange={ev => { setFavorite(!favorite)/*Particolare se inserisco event.target.value  non funziona molto probabilmente la cancellazione del Form.Check non scatena onChange() */ }} checked={favorite ? true : false} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date:</Form.Label>
                <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Score:</Form.Label>
                <StarRating star={score} setStar={setScore} />
            </Form.Group>


            <Form.Label> </Form.Label>
        </Form>
        <Container fluid ><Row ><Col md={9}></Col><Col md="1" xs='3'><Button variant="primary" onClick={handleSubmit} >Save</Button></Col></Row><br />

            <Row><Col md={9}></Col><Col md="1" xs='3' ><Button variant="danger" onClick={() => navigate('/')}>Cancel</Button></Col></Row></Container>
    </Col></Row>);

}


export default EditFilmForm;