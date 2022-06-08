const dayjs=require("dayjs");
const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

async function getAllFilms(){
const response=await fetch('http://localhost:3001/api/films',{credentials:'include'});
const FilmsJson=await response.json();
console.log(FilmsJson);
if(response.ok){
    return FilmsJson.map((fi)=>({id:fi.id, title:fi.title, favorite:fi.favorite, watchdate:fi.watchdate == null ? undefined : dayjs(fi.watchdate), rating:fi.rating,user:fi.user})) 
}
else{
    throw FilmsJson;
}
}
async function getFilms(filtro){
  //  let filtro2=filtro.trim();
    const response=await fetch(`http://localhost:3001/api/films/${filtro}`,{credentials:'include'});
    const FilmsJson=await response.json();
    if(response.ok){
        return FilmsJson.map((fi)=>({id:fi.id, title:fi.title, favorite:fi.favorite, watchdate:fi.watchdate == null ? undefined : dayjs(fi.watchdate), rating:fi.rating,user:fi.user})) 
    }
    else{
        throw FilmsJson;
    }

    }

function updateFilm(film){
    return new Promise((resolve,reject)=>{
        fetch(new URL('films/'+film.id,APIURL),{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({id:film.id,title:film.title,favorite:film.favorite,watchdate:film.watchdate.format('YYYY-MM-DD'),rating:film.rating,user:film.user})
        }).then((response)=>{
            if (response.ok){
                resolve(null);
            }else{
                response.json()
                .then((obj)=>{reject(obj);})
                .catch(()=>{reject({error:"Cannot parse server response."})});

            }
        })
    })
}
function addFilm(film) {
    // call: POST /api/exams
    return new Promise((resolve, reject) => {
      fetch(new URL('films', APIURL), {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:film.title,favorite:film.favorite,watchdate:film.watchdate.format('YYYY-MM-DD'),rating:film.rating,user:1})
    }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }
  
function deleteFilm(idFilm) {
    // call: DELETE /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(new URL('films/' + idFilm, APIURL), {
        method: 'DELETE',
        credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }
  async function logIn(credentials) {
     // console.log(credentials);
    let response = await fetch(new URL('sessions', APIURL), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  async function logOut() {
    await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
  }
  
  async function getUserInfo() {
    const response = await fetch(new URL('sessions/current', APIURL), {credentials: 'include'});
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }
  
const API={getAllFilms,getFilms,updateFilm,addFilm,deleteFilm,logIn,logOut,getUserInfo};
export default API;