import { BsPencilSquare, BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';

function MyMain(props) {
    const name = props.name;
    const films = props.films;
    const setFilms = props.setFilms;
    const navigate = useNavigate();

    function deleteExam(nome) {
        setFilms(films.filter((e) => e.nome !== nome));
    }

    function changeFavorite(nome) {
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
                if (e.date !== undefined) {
                    return e.date.isAfter(dayjs().subtract(1, "month"));
                }
                else {
                    return false;
                }
            });
            break;
        case 'Unseen':
            result = films.filter((e) => (e.date === undefined));
            break;
        default:
            result = films;
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
                                    <BsPencilSquare id="click" onClick={()=> navigate('/edit/'+el.nome)}></BsPencilSquare>
                                    
                                    <BsTrash
                                        className="trash"
                                        onClick={() => deleteExam(el.nome)} />
                                    <div id={el.favorite ? "rosso" : "nero"} >
                                        {el.nome}
                                    </div>
                                </td>
                                <td >
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={el.favorite ? true : false} onChange={() => changeFavorite(el.nome)} />
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

                        ))}
                </tbody>
            </table>
           
                <Container fluid ><Row><Col className='text-end'><input type="radio" name="add"/><BsFillPlusCircleFill id="click" color='#0d6efd' fontSize="2rem" className="plus-add" onClick={() => navigate('/add')} /></Col></Row></Container>
        </>
    );
}


export default MyMain;