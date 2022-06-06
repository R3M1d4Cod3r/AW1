'use strict';


const sqlite = require('sqlite3');
const crypto = require('crypto');

const db = new sqlite.Database("films.db", (err) => { if (err) throw err; });

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';

        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = { id: row.id, username: row.email, name: row.name };
                const salt = row.salt;

                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) { reject(err); }
                    //console.log(row.hash);
                    const password_hex = Buffer.from(row.hash, 'hex');
                    //console.log(password_hex);
                    //console.log(hashedPassword);
                    if (!crypto.timingSafeEqual(password_hex, hashedPassword))
                        resolve(false);
                    else resolve(user);
                });

            }
        });
    });
}

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?'
        db.get(sql, [id], (err, row) => {
            if (err) { reject(err); }
            if (row === undefined) { reject('user not found'); }
            resolve({ id: row.id, username: row.email, name: row.name });
        });

    });
}