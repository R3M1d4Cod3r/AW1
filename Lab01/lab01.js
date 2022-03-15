"use strict";
// Ex0
function reduce_string( arr ){
    
    return arr.map( e => {
        if (e.length >= 2)
            return e[0]+e[1]+e[e.length-1]+e[e.length-2];
        else return "";
        
    });


}


//console.log(reduce_string(["it"]));

// Ex1
const dayjs = require('dayjs');

function Film(id,title,favorites=false,date=undefined,rating){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = (date!=undefined) ? dayjs(date,'YYYY-MM-DD'):undefined;
    this.rating = rating;
    this.str = () => { return `${this.id} ${this.title} ${this.favorites} ${(this.date!=undefined) ? this.date.format('DD/MM/YYYY'):undefined} ${this.rating}`;};
}

function FilmList(){
    this.list =  [];
    this.addNewFilm = (e) => {
        this.list.push(e);
    },
    this.sortByDate = () => {
        return this.list.sort( (a,b)=>{
            if(a.date==undefined)
                return 1;
            if(b.date==undefined)
                return -1;
            return a.date.diff(b.date);
        });
    
    };

    this.deleteFilm = (id) => {
        this.list=this.list.filter((e) => (e.id != id));
    };
    this.resetWatchedFilms = () => {
        this.list.map( (e)=>(e.date=undefined));
    };
    this.getRated=()=>{
        return this.list.filter((e)=>(e.rating!=undefined)).sort((a,b)=>{
            return b.rating-a.rating;
        });
    };
}
    

let films= new  FilmList();
films.addNewFilm( new Film(1,"Pulp Fiction", true, "2022-03-10", 5));
films.addNewFilm( new Film(2,"21 Grams", true, "2022-03-17", 4));
films.addNewFilm( new Film(3,"Star Wars", false));
films.addNewFilm( new Film(4,"Matrix", false));
films.addNewFilm( new Film(5,"Shrek", false, "2022-03-21", 3));
films.list.forEach(e => console.log(e.str()));
console.log("----------------")
let sorted = films.sortByDate()
sorted.forEach(e => console.log(e.str()));
console.log("----------------")
films.deleteFilm(2);
films.list.forEach(e => console.log(e.str()));
console.log("----------------")
films.resetWatchedFilms();
films.list.forEach(e => console.log(e.str()));
console.log("----------------")
films.getRated().forEach(e => console.log(e.str()));