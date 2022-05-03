import { useState } from 'react';
import { Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';

function AddFilmForm(props) {
    const [name, setName] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [score, setScore] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate= useNavigate();
    const setFilms=props.setFilms;
 
    const handleScore = (event) => {
        const val = event.target.value;
        setScore(val);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // validation

        if (score >= 0 && score <= 5 && name !== '') {
            // add
            const newFilm = { nome: name, favorite: favorite, date: date, score: score }
            setFilms(oldFilms => [...oldFilms, newFilm]);
            navigate('/')

        }
        else if (score < 0 || score > 5) {
            setErrorMsg('Errore voto: ' + score);

        }
        else if (name === '') {
            setErrorMsg('Errore campo nome vuoto');

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
                <Form.Check type="checkbox" value={favorite} onChange={ev => setFavorite(ev.target.value)} />
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

            <Row><Col md={9}></Col><Col md="1" xs='3' ><Button variant="danger" onClick={()=>navigate('/')}>Cancel</Button></Col></Row></Container>
    </Col></Row>);

}


export default AddFilmForm;