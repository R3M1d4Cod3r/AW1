import { useState } from "react";
import { BsFillStarFill } from 'react-icons/bs';

function StarRating(props) {

    const [rating, setRating] = useState(props.star);
    const [stars_list] = useState([1, 2, 3, 4, 5])

    const Film = props.Films;
    const setFilm = props.setFilms;
    const setStar = props.setStar;
    let fun;
    if (Film) {
        fun = function changeScore(value) {
            setRating(() => (value));
            setFilm(Film.map((e) => {
                if (e.nome === props.nome) {
                    return { nome: e.nome, favorite: e.favorite, score: value, date: e.date };
                }
                return e;
            }));
        }
    } else {
        fun = function addScore(value) {
            setRating(value);
            setStar(value);
        }
    }
    return (
        <>{
            stars_list.map((star_n) => {
                return (
                    <BsFillStarFill key={star_n}
                        color={star_n <= rating ? "#ffc107" : "black"}
                        className="star"
                        onClick={() => { fun(star_n) }} />
                );
            })}</>
    );
}

export default StarRating;