"use strict";

const dayjs = require('dayjs');
const sqlite = require("sqlite3");
const db = new sqlite.Database("films.db", (err) => { if (err) throw err; });


exports.getAll = () => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.all("SELECT * FROM films", (err, rows) => {
            if (err)
                reject(err);

            rows.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            result = rows;
            resolve(result);
        });
    });
}
exports.Allfavorite = () => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.all("SELECT * FROM films WHERE films.favorite = TRUE", (err, rows) => {
            if (err)
                reject(err);

            result = rows;
            result.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            resolve(result);
        });
    });
}

exports.SeenLastMonth = () => {

    return new Promise((resolve, reject) => {
        let result = [];

        db.all("SELECT * FROM films ", (err, rows) => {
            if (err)
                reject(err);

            result = rows.filter(row => dayjs(row.watchdate, 'YYYY-MM-DD').isAfter(dayjs().subtract(1, "month")) && dayjs(row.watchdate, 'YYYY-MM-DD').isBefore(dayjs()));
            result.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            resolve(result);
        });
    });
}
exports.Unseen = () => {

    return new Promise((resolve, reject) => {
        let result = [];
        db.all("SELECT * FROM films WHERE films.watchdate IS NULL", (err, rows) => {
            if (err)
                reject(err);
            result = rows;
            result.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            resolve(result);
        });
    });
}
exports.RatingGraterThan = (r) => {
    return new Promise((resolve, reject) => {
        let result = [];

        db.all("SELECT * FROM films WHERE films.rating >= ?", [r], (err, rows) => {
            if (err)
                reject(err);
            result = rows;
            result.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            resolve(result);
        });
    });

}
exports.getFilmById = (id) => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.all("SELECT * FROM films WHERE films.id == ?", [id], (err, rows) => {
            if (err)
                reject(err);
            result = rows;
            result.forEach(row => (row.favorite = (row.favorite == 1) ? true : false));
            resolve(result);
        });
    });
}
exports.Store = async (film) => {

    let total = await new Promise((resolve, reject) => { //Count all films in the db
        db.all("SELECT COUNT(*) AS total FROM films", (err, rows) => {
            if (err)
                reject(err);
            rows.forEach((row) => {
                resolve(row.total);
            });
        });
    });
    console.log(film+"  id: "+ total+1)
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO films (id,title,favorite,watchdate,rating,user) VALUES(?,?,?,?,?,?)"
        db.run(sql, [total + 1, film.title, (film.favorite) ? 1 : 0, (film.watchdate != null) ? film.watchdate : null , film.rating,1], err => { if (err) reject(err); });
        film.id = total + 1;
        resolve(film);
    })

}

exports.Update = async (film) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE films SET title = ? , favorite = ? , watchdate = ? , rating = ? WHERE  id = ? ; ";
        db.run(sql, [film.title, (film.favorite) ? 1 : 0, (film.watchdate != undefined) ? film.watchdate : undefined, film.rating, film.id], err => { if (err) reject(err); });
        resolve(film);
    })
}

exports.markFavorite = async (film) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE films SET  favorite = ?  WHERE  id = ? ; ";
        db.run(sql, [ film.favorite , film.id], err => { if (err) reject(err); });
        resolve(film);
    })
}


exports.DeleteById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM films WHERE films.id = ?";
        db.run(sql, [id], (err) => { if (err) reject(err); });
        resolve("ok");
    });
}






