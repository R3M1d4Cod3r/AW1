import React, { useState } from "react";

import { BsStar, BsFillStarFill } from 'react-icons/bs';
function StarRating(props) {

    const [rating, setRating] = useState(props.star);
    const [hover, setHover] = useState(0);
    const Film = props.Films;
    const setFilm = props.setFilms;
    function changeScore(value) {
        setRating(value);

        setFilm(Film.map((e) => {
            if (e.nome === props.nome) {
                return { nome: e.nome, favorite: e.favorite, score: value, date: e.date };
            }
            return e;
        }));
    }
    return (
        <div>
            {[1,2,3,4,5].map((star_n, i) => {
                const ratingValue =star_n;
                return (
                    <label key={star_n}>
                        <input type="radio" name="rating" value={ratingValue}
                            onClick={() => {changeScore(ratingValue)}}

                        />

                        <BsFillStarFill
                            color={ratingValue <= (rating || hover) ? "#ffc107" : "e4e5e5"}
                            className="star"
                            onClick={() => {changeScore(ratingValue)}}/>

                    </label>);
            })}
        </div>);

}
function AddStarRating(props) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const star = props.star;
    const setStar = props.setStar;
    function addScore(value) {
        setRating(value);
        setStar(value);

    }
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={ratingValue}>
                        <input type="radio" name="rating" value={ratingValue}
                            onClick={() => addScore(ratingValue)}

                        />

                        <BsFillStarFill
                            color={ratingValue <= (rating || hover) ? "#ffc107" : "e4e5e5"}
                            className="star"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)} />

                    </label>);
            })}
        </div>);

}

export { StarRating, AddStarRating };