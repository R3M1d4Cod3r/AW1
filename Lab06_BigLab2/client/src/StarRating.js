import { useState } from "react";
import { BsFillStarFill } from 'react-icons/bs';
import API from "./API";

function StarRating(props) {

    const [rating, setRating] = useState(props.star);
    const [stars_list] = useState([1, 2, 3, 4, 5]);
    const [firstPressed, setFirstPressed] = useState(false);

    const Film = props.Films;
    const setFilm = props.setFilms;
    const setStar = props.setStar;

    function changeScore(star_n) {
        //Controlla se la prima stella viene chliccata due volte setta il rating a zero
        let value;
        if (star_n === 1) {
            if (firstPressed) {
                value = 0;
                setFirstPressed(false);
            } else {
                setFirstPressed(true);
                value = star_n;
            }
        } else {
            value = star_n;
            setFirstPressed(false);
        }
        setRating(value);
        //Controllo se viene passato una lista film allora star rating serve per modificare la lista dei film altrimenti serve per la creazione di un nuovo film
        if (Film) {
            setFilm(Film.map((e) => {
                if (e.title === props.nome) {
                    let filmnuovo= { id:e.id,title: e.title, favorite: e.favorite, rating: value, watchdate: e.watchdate };
                    API.updateFilm(filmnuovo);
                    return filmnuovo;
                }
                return e;
            }));
        }
        else {
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
                        onClick={() => changeScore(star_n)} />
                );
            })}</>
    );
}

export default StarRating;