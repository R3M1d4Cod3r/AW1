import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001');//URL del server Express


const getFilms = async (filter) => {
    let result = await fetch(new URL('/filter/' + filter.toLowerCase(), APIURL))
        .then((response) => {
            if (response.ok) {

                return response.json()
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
    return result.map(f => ({id:f.id,title:f.title,favorite:f.favorite,watchdate:dayjs(f.watchdate),rating:f.rating}));
}

const getFilmsById = async (id) => {
    let result= fetch(new URL('/film/:id' + id, APIURL))
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
        return result.map(f => ({id:f.id,title:f.title,favorite:f.favorite,watchdate:dayjs(f.watchdate),rating:f.rating}));
}

const createFilm = async (film) => {
    console.log(film);
    return fetch(new URL("/add", APIURL),{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({title:film.title,favorite:film.favorite,watchdate:film.watchdate.format("YYYY-MM-DD"),rating:film.rating}),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
}

const updateFilm = async (film) => {
    return fetch(new URL("/edit", APIURL),{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(film),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
}

const markFilm = async (id_favorite,fav) => {
    let ob = {id: id_favorite, favorite : fav}
    return fetch(new URL("/mark", APIURL),{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(ob),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
}


const deleteFilm = async (ID) => {
    let Id = {id: ID}
    return fetch(new URL("/delete", APIURL),{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(Id),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .catch((error) => {
            throw error;
        });
}
const API ={getFilms ,getFilmsById ,createFilm,updateFilm,markFilm,deleteFilm};
export default API;