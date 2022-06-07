'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('films2.db', (err) => {
  if(err) throw err;
});

// get all courses
exports.listFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsFavorite = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE favorite==1';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsBestRated = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE rating==5';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsSeenLastMonth = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE watchdate BETWEEN 2022-02-12 AND 2022-05-12';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};
exports.listFilmsUnseen = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE watchdate IS NULL ';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.listFilmsGetID = (Parid) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM films WHERE id==${Parid} `;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite , watchdate: e.watchdate, rating: e.rating, score:e.score}));
      resolve(courses);
    });
  });
};

exports.createFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO films(title,favorite, watchdate,rating) VALUES(?,?,DATE(?), ?)';
    db.run(sql, [film.title,film.favorite,film.watchdate,film.rating], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// update an existing film
exports.updateFilm = (film,id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET title=?,favorite=?,watchdate=DATE(?), rating=?, user=? WHERE id = ?';
    db.run(sql, [film.title, film.favorite,film.watchdate,film.rating, film.user,id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
  
};
// delete an existing film
exports.deleteFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ?';
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });}