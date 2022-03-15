"use strict";

const sqlite= require("sqlite3");

const db = new sqlite.Database("exams.sqlite",(err)=>{ if(err) throw err; });
let result=[];//non posso collezionare i dati in una result perché non so quando la callback verrà eseguita

let sql="SELECT * FROM ";
db.all(sql,(err,rows)=>{
    if(err) 
        throw err;
    for(let row of rows){
        console.log(row);
        result.push(row);
    }
});

result.forEach(e => (console.log(e)));