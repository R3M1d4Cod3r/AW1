"use strict";

function reduce_string( arr ){
    
    return arr.map( e => {
        if (e.length >= 2)
            return e[0]+e[1]+e[e.length-1]+e[e.length-2];
        else return "";
        
    });


}


console.log(reduce_string(["Ciaoooo"]));