'use strict';
const cors=require('cors');
const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao.js'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); 
// init express
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));


// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});
const app = express();
const port = 3001;
// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'not authenticated'});
}
// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());


/*** APIs ***/


// GET /api/films
app.get('/api/films', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.listFilms(req.user.id);
    //res.json(exams);
    setTimeout( ()=> res.json(films), 1000);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: `Database error while retrieving films`}).end();
  }
});

  app.get('/api/films/All',isLoggedIn,async(req,res)=>{
    try {
      console.log("prova",req.user.id);
      const films = await dao.listFilms(req.user.id);
      //res.json(exams);
      setTimeout( ()=> res.json(films), 1000);
    } catch(err) {
      console.log(err);
      res.status(500).json({error: `Database error while retrieving films`}).end();
    }
  });

  app.get('/api/films/Favorite',isLoggedIn,(req,res)=>{
dao.listFilmsFavorite(req.user.id).
then(films=>res.json(films)).catch(()=>res.status(500).end())});

app.get('/api/films/BestRated',isLoggedIn,(req,res)=>{
    dao.listFilmsBestRated(req.user.id).then(films=>res.json(films)).catch(()=>res.status(500).end())});

app.get('/api/films/SeenLastMonth',isLoggedIn,(req,res)=>{
        dao.listFilmsSeenLastMonth(req.user.id).then(films=>res.json(films)).catch((err)=>{res.status(500).end();console.log(err)})});

app.get('/api/films/Unseen',isLoggedIn,(req,res)=>{
    dao.listFilmsUnseen(req.user.id).then(films=>res.json(films)).catch(()=>res.status(500).end())});

 app.get('/api/films/:userID',isLoggedIn,(req,res)=>{
    dao.listFilmsGetID(req.params.userID).then(films=>res.json(films)).catch(()=>res.status(500).end())});
            
    app.post('/api/films', isLoggedIn,[
      //check('title').isLength({min:1}).trim,
      check('title').isAlphanumeric(),
      check('favorite').isInt({min:0,max:1}),
      check('watchdate').isDate({format: 'YYYY-MM-DD', strictMode: true}),
      check('rating').isInt({min:0,max:5})
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
    
      const film = {
        title: req.body.title,
        favorite:req.body.favorite,
        watchdate: req.body.watchdate,
        rating:req.body.rating,
        user:req.body.user
      };
    
      try {
        await dao.createFilm(film,req.user.id);
        res.status(201).end();
      } catch(err) {
        console.log("riga 134");

        res.status(503).json({error: `Database error during the creation of film ${film.title}.`});
      }
    });
  
      app.put('/api/films/:FilmId', isLoggedIn,[
        check('rating').isInt({min: 0, max: 5}),
        check('favorite').isInt({min: 0, max: 1}),
        check('watchdate').isDate({format: 'YYYY-MM-DD', strictMode: true})
      ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log("errore nell'update");
          return res.status(422).json({errors: errors.array()});
        }
      
        const film = req.body;
      
        // you can also check here if the code passed in the URL matches with the code in req.body
        try {
          await dao.updateFilm(film,req.user.id);
          res.status(200).end();
        } catch(err) {
          res.status(503).json({error: `Database error during the update of film ${req.params.FilmId}.`});
        }
      
      });
      
// DELETE /api/films/<id>
app.delete('/api/films/:id',isLoggedIn, async (req, res) => {
  try {
    await dao.deleteFilm(req.params.id,req.user.id);
    res.status(204).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of film ${req.params.id}.`});
  }
});
// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else{
    res.status(401).json({error: 'Unauthenticated user!'});}
});

            app.listen(port, () =>
console.log(`Server listening on port ${port}`)) ;