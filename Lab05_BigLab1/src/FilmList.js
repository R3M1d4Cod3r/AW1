import dayjs from 'dayjs';
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




export {Film, FilmList};