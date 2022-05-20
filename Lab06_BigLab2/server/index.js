
const dao = require("./DAO.js");
const express = require('express');
const port = 3001;
const cors = require('cors');
const { check, validationResult } = require("express-validator");
const dayjs = require("dayjs");
const app = express();

app.use(cors());
app.use(express.json());//importante altrimenti le richieste post in json non funzionanp

const CHECKALL = () => {
    return [
        check('rating').isIn([1, 2, 3, 4, 5]),
        check('favorite').isBoolean(),
        check('title').isAlphanumeric(),
        check('watchdate').custom(date => {

            if (date != null && dayjs(date, 'YYYY-MM-DD').isValid() && dayjs(date, 'YYYY-MM-DD').isAfter(dayjs()))
                throw new Error("Watchdate is in the Future, this is forbidden");

            if (date == null)
                return true;
            if (dayjs(date, 'YYYY-MM-DD').isValid())
                return true;
            throw new Error("watchdate Error");

        })];
}
app.get('/filter/:filter_name', (req, res) => {
    let f;
    switch (req.params.filter_name) {
        case 'All':
            f = () => dao.getAll();
            break;
        case 'Favorite':
            f = () => dao.Allfavorite();
            break;
        case 'Best Rated':
            f = () => dao.RatingGraterThan(5);
            break;
        case 'Seen Last Month':
            f = () => dao.SeenLastMonth()
            break;
        case 'Unseen':
            f = () => dao.Unseen();
            break;
        default:
            f = () => dao.getAll();
            break;
    }
    f().then(films => res.json(films)).catch(err => console.log(err));
});

app.get('/film/:id', (req, res) => {
    dao.getFilmById(req.params.id)
        .then(film => res.json(film))
        .catch(err => console.log(err));
});

app.post('/add', CHECKALL(), (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log(req.body);
        return res.status(422).json({ errors: errors.array() });
    }
    const film = {//title,favorite,watchdate,rating
        title: req.body.title,
        favorite: req.body.favorite,
        watchdate: req.body.watchdate,
        rating: req.body.rating,
    };
    console.log(film + " " + dayjs(film.watchdate, "YYYY-MM-DD").isValid());
    dao.Store(film)
        .then(film => res.json(film))
        .catch(err => console.log(err));
});

app.put('/edit', CHECKALL(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body);
        return res.status(422).json({ errors: errors.array() });
    }
    const film = {//title,favorite,watchdate,rating
        id: req.body.id,
        title: req.body.title,
        favorite: req.body.favorite,
        watchdate: req.body.watchdate,
        rating: req.body.rating,
    };
    dao.Update(film)
        .then(film => res.json(film))
        .catch(err => console.log(err));
});

app.put('/mark', [
    check('id').isDecimal(),
    check('favorite').isBoolean(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const film = {//title,favorite,watchdate,rating
        id: req.body.id,
        favorite: req.body.favorite,
    };
    dao.markFavorite(film)
        .then(film => res.json(film))
        .catch(err => console.log(err));
});

app.delete('/delete', [check('id').isDecimal(),], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    dao.DeleteById(req.body.id)
        .then(msg => res.json(msg))
        .catch(err => console.log(err));
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));