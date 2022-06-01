import { useState } from 'react';
import { Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';

//Componente che si occupa dell'aggiunta di un film alla lista
function AddFilmForm(props) {
    //Stati per Controlled Form 
    const [name, setName] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [score, setScore] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const setFilms = props.setFilms;


    const handleSubmit = (event) => {
        event.preventDefault();

        if (score >= 0 && score <= 5 && name !== '' && !date.isAfter(dayjs())) {
            // Se inserimento dati corretto

            const newFilm = { nome: name, favorite: favorite, date: date.isValid() ? date : undefined, score: score }
            setFilms(newFilm);
            setTimeout(() => navigate('/'),1000);//Ritorno alla HomePage

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
                <Form.Label>Name:</Form.Label>
                <Form.Control value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
            </Form.Group>
            <Form.Label>Favorite:</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" value={favorite} onChange={ev => { setFavorite(ev.target.value) }} />
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


export default AddFilmForm;