import { BsPencilSquare, BsTrash, BsFillPlusCircleFill} from 'react-icons/bs';
import { useState } from 'react';
import { Button, Form, Alert, Row,Col, Container } from 'react-bootstrap';

import dayjs from 'dayjs';
import { StarRating, AddStarRating } from './StarRating';

function MyMain(props) {
    const name = props.name;
    const [films, setFilms] = useState(props.films);
    const [showForm, setShowForm] = useState(false);

    function deleteExam(nome) {
        setFilms(films.filter((e) => e.nome !== nome));
    }

    function changeColorFavorite(nome) {
        setFilms(films.map((e) => {
            if (e.nome === nome) {
                return { nome: e.nome, favorite: !e.favorite, score: e.score, date: e.date };
            }
            return e;
        }));
    }




    let result;

    switch (name) {
        case 'All':
            result = films;
            break;
        case 'Favorite':
            result = films.filter(e => e.favorite);
            break;
        case 'Best Rated':
            result = films.filter(e => (e.score === 5));
            break;
        case 'Seen Last Month':
            result = films.filter(e => {
                if (e.date !== '') {
                    return e.date.isAfter(dayjs().subtract(1, "month"));
                }
                else {
                    return false;
                }
            });
            break;
        case 'Unseen':
            result = films.filter((e) => (e.date == ''));
    }
    return (
        <>
            <h1>{name}</h1>
            <table className='table'>
                <tbody id="film-table">

                    {
                        result.map((el) => (
                        
                                <tr key={el.nome} >
                                    <td >

                                        <BsPencilSquare></BsPencilSquare>
                                        <input type="radio" name="delete"
                                        />
                                        <BsTrash
                                            className="trash"
                                            onClick={() => deleteExam(el.nome)} />


                                        <div id={el.favorite ? "rosso" : "nero"} >
                                            {el.nome}
                                        </div>

                                    </td>

                                    <td >

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={el.favorite ? true : false} onChange={() => changeColorFavorite(el.nome)}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Favorite</label>
                                        </div>
                                    </td>

                                    <td>
                                        {el.date ? el.date.format("MMM DD, YYYY") : ""}
                                    </td>
                                    <td>
                                        <StarRating star={el.score} nome={el.nome} Films={films} setFilms={setFilms} />
                                    </td>

                                </tr>
                          
                        ))
                    }

                </tbody>
            </table>
            {(!showForm) ?
            <Container fluid ><Row><Col className='text-end'><BsFillPlusCircleFill color='#0d6efd' fontSize="2rem"  onClick={() => setShowForm(true)}/></Col></Row></Container>
                
                :
                <FilmForm films={films} setFilms={setFilms} cancel={() => setShowForm(false)} />

            }


        </>
    );
}

function FilmForm(props) {
    const [name, setName] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [score, setScore] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const handleScore = (event) => {
        const val = event.target.value;
        setScore(val);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // validation

        if (score >= 0 && score <= 5 && name != '') {
            // add
            const newFilm = { nome: name, favorite: favorite, date: date, score: score }
            props.setFilms(oldFilms => [...oldFilms, newFilm]);
            props.cancel();
        }
        else if (score < 0 || score > 5) {
            setErrorMsg('Errore voto: ' + score);

        }
        else if (name == '') {
            setErrorMsg('Errore campo nome vuoto');

        }
    }

    return (<>
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
                <AddStarRating star={score} setStar={setScore} />
            </Form.Group>


            <Form.Label> </Form.Label>
        </Form>
        <Container fluid ><Row ><Col  md="3" offsetMd="9"  className='float-right'><Button onClick={handleSubmit} >Save</Button></Col></Row><br/>

        <Row><Col className='float-end'><Button onClick={props.cancel}>Cancel</Button></Col></Row></Container>
    </>);

}

export default MyMain;