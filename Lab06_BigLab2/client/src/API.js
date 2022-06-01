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
    return result.map(f => ({id:f.id,nome:f.title,favorite:f.favorite,date:dayjs(f.watchdate),score:f.rating}));
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
        return result.map(f => ({id:f.id,nome:f.title,favorite:f.favorite,date:dayjs(f.watchdate),score:f.rating}));
}

const createFilm = async (film) => {
    console.log(film);
    return fetch(new URL("/add", APIURL),{
        method: 'POST',
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

const markFilm = async (id_favorite) => {
    return fetch(new URL("/mark", APIURL),{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(id_favorite),
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


const deleteFilm = async (id) => {
    return fetch(new URL("/mark", APIURL),{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(id),
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