"use strict";
// Ex0
function reduce_string( arr ){
    
    return arr.map( e => {
        if (e.length >= 2)
            return e[0]+e[1]+e[e.length-1]+e[e.length-2];
        else return "";
        
    });


}


console.log(reduce_string(["it"]));

// Ex1

function Film(id,title,favorites=false,date,rating){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}
