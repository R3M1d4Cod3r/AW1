import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001');//URL del server Express


const getFilms = async (filter) => {
    let result = await fetch(new URL('/filter/' + filter.toLowerCase(), APIURL),{credentials:'include'})
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
        credentials: 'include',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({title:film.title,favorite:film.favorite,watchdate:film.watchdate?.format("YYYY-MM-DD"),rating:film.rating}),
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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

const logIn = async (credentials) => {
    let response = await fetch( new URL('/sessions', APIURL),{
        method: 'POST',
        credentials: 'include',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(credentials),
    });
    console.log(credentials);
    if ( response.ok){
        const user = await response.json();
        return user;
    } else {
        const err = await response.json();
        throw err;
    }
}
const API ={getFilms ,getFilmsById ,createFilm,updateFilm,markFilm,deleteFilm, logIn};
export default API;