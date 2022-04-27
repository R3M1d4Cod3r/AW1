
import { Film, FilmList } from './FilmList.js';
import { BsPencilSquare, BsTrash, BsStar, BsFillStarFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import { useState } from 'react';


function MyMain(props) {
    const name = props.name;

    let films = new FilmList();
    films.addNewFilm(new Film(1, 'Pulp Fiction', true, '2022-03-10', 5));
    films.addNewFilm(new Film(2, '21 Grams', true, '2022-03-17', 4));
    films.addNewFilm(new Film(3, 'Star Wars', false));
    films.addNewFilm(new Film(4, 'Matrix', false));
    films.addNewFilm(new Film(5, 'Shrek', false, '2022-03-21', 3));
    films.addNewFilm(new Film(6, "Sherlock", true, '2022-04-04', 5));
    films.addNewFilm(new Film(7, "The Batman", false, '2022-02-04', 1));

    let result;;

    switch (name) {
        case 'All':
            result= films.list ;
            break;
        case 'Favorite':
            result = films.list.filter(e => e.favorites);
            break;
        case 'Best Rated':
            result = films.list.filter(e => (e.rating == 5));
            break;
        case 'Seen Last Month':
            result = films.list.filter(e => {
                if (e.date != undefined) {
                    return e.date.isAfter(dayjs().subtract(1, "month")) && e.date.isBefore(dayjs());
                }
                else {
                    return false;
                }
            });
            break;

    }
    return (
        <>
            <h1>{name}</h1>
            <table className="table">
                <tbody id="film-table">

                    {
                        result.map((el) => (<tr key={el.id}>
                            <td ><div><BsPencilSquare /><BsTrash /> <div id={el.favorites ? "rosso" : "nero"} >{el.title}</div> </div> </td>
                            <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Favorite</label>
                                </div>
                            </td>
                            <td>{el.date ? el.date.format("MMM DD, YYYY") : ""}</td>
                            <td>
                                {[1, 2, 3, 4, 5].map((i) => ((i < el.rating) ? <BsFillStarFill key={i}/> : <BsStar key={i}/>))}
                            </td>
                        </tr>))
                    }

                </tbody>
            </table>
        </>
    );
}
export default MyMain;
