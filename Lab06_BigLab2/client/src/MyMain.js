import { BsPencilSquare, BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';
import API from './API.js';

function MyMain(props) {//Componente per la gestione della tabella di film
    let name = props.filter;
    const films = props.films;
    const setFilms = props.setFilms;
    const navigate = useNavigate();

    function deleteExam(film) {//funzione per rimuovere un film
        setFilms(films.filter((e) => e.title !== film.title));
        API.deleteFilm(film.id).then(()=>console.log("ok")).catch( e => console.log(e));
    }

    function changeFavorite(film) {//funzione per modificare preferenza di un film
        setFilms(films.map((e) => {
            if (e.title === film.title) {
                return { title: e.title, favorite: !e.favorite, rating: e.rating, watchdate: e.watchdate };
            }
            return e;
        }));
        API.markFilm(film.id,!film.favorite).then(()=>console.log("ok")).catch( e => console.log(e));
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
                                    <BsPencilSquare id="click" onClick={() => navigate('/edit/' + el.title)}></BsPencilSquare>

                                    <BsTrash
                                        className="trash"
                                        onClick={() => deleteExam(el)} />
                                    <div id={el.favorite ? "rosso" : "nero"} >
                                        {el.title}
                                    </div>
                                </td>
                                <td >
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={el.favorite ? true : false} onChange={() => changeFavorite(el)} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Favorite</label>
                                    </div>
                                </td>

                                <td>
                                    {el.watchdate ? el.watchdate.format("MMM DD, YYYY") : ""}
                                </td>
                                <td>
                                    <StarRating star={el.rating} nome={el.title} Films={films} setFilms={setFilms} /> {/*Stelle laterali per settare voto=0 premere due volte la stella 1*/}
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