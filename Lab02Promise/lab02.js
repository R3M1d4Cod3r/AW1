"use strict";

const dayjs = require('dayjs');
const sqlite = require("sqlite3");
const db = new sqlite.Database("films.db",(err)=>{if(err) throw err;});

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

function FilmLibrary(){
    this.getAll =  () => {
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();
            db.all("SELECT * FROM films",(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                    films_result.addNewFilm(new Film(row.id,row.title,(row.favorite != 0 ) ? true : false,row.watchdate,row.rating));
                });
                resolve(films_result.list);
            });
        });
    }
    this.Allfavorite = () => {
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();
            db.all("SELECT * FROM films WHERE films.favorite != FALSE",(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                    films_result.addNewFilm(new Film(row.id,row.title,(row.favorite !=0 ) ? true : false,row.watchdate,row.rating));
                });

                resolve(films_result.list);
            });
        });
    }
    this.AllWatchedToday = () => {
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();

            db.all("SELECT * FROM films WHERE films.favorite == ?",[dayjs().format("YYYY-MM-DD")],(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                    films_result.addNewFilm(new Film(row.id,row.title,(row.favorite !=0 ) ? true : false,row.watchdate,row.rating));
                });

                resolve(films_result.list);
            });
        });
    }
    this.WathcedBefore = (date) =>{
        let d = dayjs(date,'YYYY-MM-DD');
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();

            db.all("SELECT * FROM films ",(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                    if(dayjs(row.watchdate,'YYYY-MM-DD').isBefore(d))
                        films_result.addNewFilm(new Film(row.id,row.title,(row.favorite !=0 ) ? true : false,row.watchdate,row.rating));
                });

                resolve(films_result.list);
            });
        });
    }
    this.RatingGraterThan = (r) => {
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();

            db.all("SELECT * FROM films WHERE films.rating >= ?",[r],(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                        films_result.addNewFilm(new Film(row.id,row.title,(row.favorite !=0 ) ? true : false,row.watchdate,row.rating));
                });

                resolve(films_result.list);
            });
        });
    
    }
    this.getFilmByTitle = (title) => {
        return new Promise((resolve,reject)=>{
            let films_result= new  FilmList();

            db.all("SELECT * FROM films WHERE films.title == ?",[title],(err,rows)=>{
                if(err)
                     reject(err);
                else
                rows.forEach((row)=>{
                        films_result.addNewFilm(new Film(row.id,row.title,(row.favorite !=0 ) ? true : false,row.watchdate,row.rating));
                });

                resolve(films_result.list);
            });
        });
    
    }

}

let f=new FilmLibrary();
let flist= new FilmList();

f.getAll()
.then((e)=>{flist=e;}).catch(console.log)
.then( ()=>{flist.forEach(x=>(console.log(x.str())));})
.then(
    f.Allfavorite()
    
    .then((e)=>{flist=e;}).catch(console.log)
    .then( ()=>{db.close();flist.forEach(x=>(console.log(x.str()))); } )
    .then(
        f.AllWatchedToday()
        .then(e=> flist=e).catch(console.log)
        .then(()=>{flist.forEach(x=>(console.log(x.str())));})
        .then(
            f.WathcedBefore("2023-03-16")
            .then(e=> flist=e).catch(console.log)
            .then(()=>{flist.forEach(x=>(console.log(x.str())));})
            .then(
                f.RatingGraterThan(5)
                .then(e=> flist=e).catch(console.log)
                .then(()=>{flist.forEach(x=>(console.log(x.str())));})
                .then(
                    f.getFilmByTitle("Pulp Fiction")
                    .then(e=> flist=e).catch(console.log)
                    .then(()=>{flist.forEach(x=>(console.log(x.str())));})
    
                )

            )
        )
    )


    );
