'use strict';


//const _dayjs = dayjs();

function Film(id, title, favorites = false, date = undefined, rating) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = (date != undefined) ? dayjs(date, 'YYYY-MM-DD') : undefined;
    this.rating = rating;
    this.str = () => { return `${this.id} ${this.title} ${this.favorites} ${(this.date != undefined) ? this.date.format('DD/MM/YYYY') : undefined} ${this.rating}`; };
}

function FilmList() {
    this.list = [];
    this.addNewFilm = (e) => {
        this.list.push(e);
    };
    this.sortByDate = () => {
        return this.list.sort((a, b) => {
            if (a.date == undefined)
                return 1;
            if (b.date == undefined)
                return -1;
            return a.date.diff(b.date);
        });

    };

    this.deleteFilm = (id) => {
        this.list = this.list.filter((e) => (e.id != id));
    };
    this.resetWatchedFilms = () => {
        this.list.map((e) => (e.date = undefined));
    };
    this.getRated = () => {
        return this.list.filter((e) => (e.rating != undefined)).sort((a, b) => {
            return b.rating - a.rating;
        });
    };
}


let films = new FilmList();
films.addNewFilm(new Film(1, 'Pulp Fiction', true, '2022-03-10', 5));
films.addNewFilm(new Film(2, '21 Grams', true, '2022-03-17', 4));
films.addNewFilm(new Film(3, 'Star Wars', false));
films.addNewFilm(new Film(4, 'Matrix', false));
films.addNewFilm(new Film(5, 'Shrek', false, '2022-03-21', 3));
films.addNewFilm(new Film(6, "Sherlock", true, '2022-04-04', 5));
films.addNewFilm(new Film(6, "The Batman", false, '2022-02-04', 1));


let stelle = (num) => {
    let star = "";
    for (let x = 0; x < num; x++)
        star += "<i class='bi bi-star-fill'></i>";
    for (let y = 0; y < 5 - num; y++) 
        star += "<i class='bi bi-star'></i>";
    return star;
}

let create_table = (film_list) => {
    const RowParent = document.getElementById('film-table');
    RowParent.innerHTML = '';
    for (let f of film_list) {
        let tr = document.createElement("tr");
        tr.innerHTML = "<tr> \
        <td "+ ((f.favorites) ? "id='rosso'" : "") + ">" + f.title + "</td> \
        <td> \
            <div class='form-check'> \
                <input class='form-check-input' type='checkbox' value='' id="+ ((f.favorites) ? "'flexCheckChecked' checked" : 'flexCheckDefault') + "> \
                <label class='form-check-label' for='flexCheckDefault'>Favorite</label> \
            </div> \
        </td> \
        <td>"+ ((f.date) ? f.date.format("MMM DD, YYYY") : "") + "</td> \
        <td> "+ ((f.rating) ? stelle(f.rating) : stelle(0)) + "</td> \
        </tr>"
        RowParent.append(tr);
    }
};

let LastClicked;

window.addEventListener('load', event => {
    LastClicked=document.getElementById('All');
    create_table(films.list);
});

let all_b = document.getElementById('All');
all_b.addEventListener('click', event => {
    LastClicked.classList.replace("btn-primary","btn-light");
    all_b.classList.replace("btn-light","btn-primary",);
    LastClicked=all_b;
    create_table(films.list);
});
let favorite_b=document.getElementById("Favorite");
favorite_b.addEventListener('click', event => {
    LastClicked.classList.replace("btn-primary","btn-light");
    favorite_b.classList.replace("btn-light","btn-primary",);
    LastClicked=favorite_b;
    create_table(films.list.filter(e => e.favorites));
});
let br_b=document.getElementById("Best Rated");
br_b.addEventListener('click', event => {
    LastClicked.classList.replace("btn-primary","btn-light");
    br_b.classList.replace("btn-light","btn-primary",);
    LastClicked=br_b;
    create_table(films.list.filter(e => (e.rating == 5)));
});
let slm_b=document.getElementById("Seen Last Month");
slm_b.addEventListener('click', event => {
    LastClicked.classList.replace("btn-primary","btn-light");
    slm_b.classList.replace("btn-light","btn-primary",);
    LastClicked=slm_b;
    create_table(films.list.filter(e => {
        if (e.date != undefined) {
            return  e.date.isAfter(dayjs().subtract(1,"month")) && e.date.isBefore(dayjs());
        }
        else {
            return false;
        }
    }));
});
