import './DAO.js';

const express = require('express');
const port = 3001;
const cors = require('cors');
const app = express();
const film = new Filmlibrary();

app.use(cors());
app.get('/films', (req, res) => {
    film.getAll()
        .then((films) => res.json(films))
        .catch((err) => res.status(503).json(dbErrorObj));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));