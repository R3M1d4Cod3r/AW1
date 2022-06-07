import { BsPencilSquare, BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { Row, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import StarRating from './StarRating.js';
import { useNavigate } from 'react-router-dom';

function MyMain(props) {//Componente per la gestione della tabella di film
    let name = props.filter;
    const films = props.films;
    
    const updateFilm = props.updateFilm;
    const navigate = useNavigate();


    /*function deleteExam(id) {//funzione per rimuovere un film
        setFilms(films.filter((e) => e.id !== id));
    }*/

    function changeFavorite(id) {//funzione per modificare preferenza di un film
      let  e=films.find(fi=>fi.id==id);
        updateFilm( { id:e.id, title: e.title, favorite:e.favorite==1?0:1, rating: e.rating, watchdate: e.watchdate,user:e.user });
    }

    let result;
    switch (name) {//switch per i filtri
        case 'All':
            result = films;
            break;
        case 'Favorite':
            result = films.filter(e => e.favorite);
            break;
        case 'Best Rated':
            result = films.filter(e => (e.rating === 5));
            break;
        case 'Seen Last Month':
            result = films.filter(e => {
                if (e.watchdate !== undefined) {
                    return e.watchdate.isAfter(dayjs().subtract(1, "month"));
                }
                else {
                    return false;
                }
            });
            break;
        case 'Unseen':
            result = films.filter((e) => (e.watchdate === undefined));
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
                            <tr key={el.id} >
                                <td >
                                    <BsPencilSquare id="click" onClick={() => navigate(`/edit/${el.id}`)}></BsPencilSquare>

                                    <BsTrash
                                        className="trash"
                                        onClick={() => props.deleteFilm(el.id)} />
                                    <div id={el.favorite==1 ? "rosso" : "nero"} >
                                        {el.title}
                                    </div>
                                </td>
                                <td >
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={el.favorite ? 1 : 0} onChange={() => changeFavorite(el.id)} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Favorite</label>
                                    </div>
                                </td>

                                <td>
                                    {el.watchdate ? el.watchdate.format("YYYY-MM-DD") : ""}
                                </td>
                                <td>
                                    <StarRating star={el.rating} id={el.id} Films={props.films} updateFilm={updateFilm} /> {/*Stelle laterali per settare voto=0 premere due volte la stella 1*/}
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