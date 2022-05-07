import { useState } from 'react';
import { Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate, useParams } from 'react-router-dom';

//Compnente che si occupa dell'aggiunta di un film alla lista
function EditFilmForm(props) {
    const navigate = useNavigate();
    const { FilmName } = useParams();

    const films = props.films;
    const setFilms = props.setFilms;

    const FilmToEdit = films.find((f) => f.nome === FilmName);



    const [name, setName] = useState(FilmToEdit.nome);
    const [favorite, setFavorite] = useState(FilmToEdit.favorite);
    const [date, setDate] = useState(FilmToEdit.date ? FilmToEdit.date : dayjs());
    const [score, setScore] = useState(FilmToEdit.score);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // validation

        if (score >= 0 && score <= 5 && name !== '' &&  !date.isAfter(dayjs())) {
            // add
            const newFilm = { nome: name, favorite: favorite, date: date, score: score };
            //setFilms(films.filter((f) => (f !== FilmToEdit.nome)));
            //setFilms(() => [...films, newFilm]);
            setFilms(()=> films.map( f => {
                if(f.nome===FilmToEdit.nome){
                    return newFilm
                }
                return f;
            }));
            navigate('/')

        }
        else if (score < 0 || score > 5) {
            setErrorMsg('Errore voto: ' + score);

        }
        else if (name === '') {
            setErrorMsg('Errore campo nome vuoto');

        }
        else if(date.isAfter(dayjs())){
            setErrorMsg('Errore la data di visione non può essere futura');
        }
    }

    return (<Row><Col><br />
        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}

        <Form>
            <Form.Group>
                <Form.Label><h1>Name: {FilmToEdit.nome} </h1></Form.Label>
                <Form.Control value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
            </Form.Group>
            <Form.Label>Favorite:</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" value={favorite} onChange={ev => setFavorite(ev.target.value)} checked={favorite ? true : false} />
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