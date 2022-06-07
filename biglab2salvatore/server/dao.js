'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('films.db', (err) => {
  if(err) throw err;
});

// get all courses
exports.listFilms = (userId) => {
  return new Promise((resolve, reject) => {
    console.log("xx");
    const sql = 'SELECT * FROM films WHERE user==?';
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, user:e.user}));
      resolve(films);
    });
  });
};

exports.listFilmsFavorite = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE favorite==1 AND user==?';
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, user:e.user}));
      resolve(films);
    });
  });
};

exports.listFilmsBestRated = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE rating==5 AND user==?';
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsSeenLastMonth = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE watchdate BETWEEN 2022-02-12 AND 2022-05-12 AND user==?';
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};
exports.listFilmsUnseen = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE watchdate IS NULL and USER==? ';
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsGetID = (Parid,userID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM films WHERE id==${Parid} AND user==? `;
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.createFilm = (film,userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO films(title,favorite, watchdate,rating,user) VALUES(?,?,DATE(?), ?,?)';
    db.run(sql, [film.title,film.favorite,film.watchdate,film.rating,userID], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// update an existing film
exports.updateFilm = (film,userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET title=?,favorite=?,watchdate=DATE(?), rating=? WHERE id = ? AND user=?' ;
    db.run(sql, [film.title, film.favorite,film.watchdate,film.rating,film.id ,userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      console.log("Update");
      resolve(this.lastID);
    });
  });
  
};
// delete an existing film
exports.deleteFilm = (id,userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ? AND user=?';
    console.log("riga128");
    db.run(sql, [id, userID], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });}