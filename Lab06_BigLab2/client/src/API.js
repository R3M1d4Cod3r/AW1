const APIURL = new URL('http://localhost:3001');//URL del server Express


async function getFilms(filter) {
    return fetch(new URL('/:'+filter, APIURL))
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

async function createFilm(){
    return fetch(new URL("/createFilm",APIURL))
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

async function updateFilm(id){
    return fetch(new URL(`/updateFilm/:${id}`,APIURL))
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
