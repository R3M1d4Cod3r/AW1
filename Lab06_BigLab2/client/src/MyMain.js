import { BsPencilSquare, BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';

function MyMain(props) {//Componente per la gestione della tabella di film
    let name = props.filter;
    const films = props.films;
    const setFilms = props.setFilms;
    const navigate = useNavigate();

    function deleteExam(nome) {//funzione per rimuovere un film
        setFilms(films.filter((e) => e.nome !== nome));
    }

    function changeFavorite(nome) {//funzione per modificare preferenza di un film
        setFilms(films.map((e) => {
            if (e.nome === nome) {
                return { nome: e.nome, favorite: !e.favorite, score: e.score, date: e.date };
            }
            return e;
        }));
    }

   
    return (
        <>
            <h1>{name}</h1>
            <table className='table'>
                <tbody id="film-table">
                    {
                        films.map((el) => (
                            <tr key={el.id} >
                                <td >
                                    <BsPencilSquare id="click" onClick={() => navigate('/edit/' + el.nome)}></BsPencilSquare>

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
                                    <StarRating star={el.score} nome={el.nome} Films={films} setFilms={setFilms} /> {/*Stelle laterali per settare voto=0 premere due volte la stella 1*/}
                                </td>
                            </tr>

                        ))}
                </tbody>
            </table>

            <Container fluid ><Row><Col className='text-end'><input type="radio" name="add" /><BsFillPlusCircleFill id="click" color='#0d6efd' fontSize="2rem" className="plus-add" onClick={() => navigate('/add')} /></Col></Row></Container>
        </>
    );
}


export default MyMain;