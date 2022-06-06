
const dao = require("./DAO.js");
const express = require('express');
const port = 3001;
const cors = require('cors');
const { check, validationResult } = require("express-validator");
const dayjs = require("dayjs");
const app = express();
const userDao = require('./user-dao');

const passport = require('passport');//NEESSARI PER PASSPORT
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session'); // enable sessions

app.use(cors({
    origin : 'http://localhost:3000',  //NECESSARIO PER USARE PASSPORT CON CORSS
    credentials: true ,
}));
app.use(express.json());//importante altrimenti le richieste post in json non funzionano


passport.use(new LocalStrategy(
    function(username,password,done){
        userDao.getUser(username,password)
        .then(user => {
            if(!user)
                return done(null,false,{ message : 'incorrec username and/or passrword'});

                return done(null, user);
        })
    }
))

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=> {
    userDao.getUserById(id)
    .then(user => {
        done(null,user);
    })
    .catch( err => {
        done(err,null)
    });
});

app.use(session({
    secret : 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

const isloggedIn = (req,res,next) =>{
    if(req.isAuthenticated())
        return next();
        
    return res.status(401).json({error : 'not authenticated'});
};

const CHECKALL = () => {
    return [
        check('rating').isIn([0,1, 2, 3, 4, 5]),
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
app.get('/filter/:filter_name', isloggedIn, (req, res) => {
    let f;
    switch (req.params.filter_name) {
        case 'all':
            f = () => dao.getAll();
            break;
        case 'favorite':
            f = () => dao.Allfavorite();
            break;
        case 'best rated':
            f = () => dao.RatingGraterThan(5);
            break;
        case 'seen last month':
            f = () => dao.SeenLastMonth()
            break;
        case 'unseen':
            f = () => dao.Unseen();
            break;
        default:
            f = () => dao.getAll();
            break;
    }
    f().then(films => res.json(films)).catch(err => console.log(err));
});

app.get('/film/:id', isloggedIn,(req, res) => {
    dao.getFilmById(req.params.id)
        .then(film => res.json(film))
        .catch(err => console.log(err));
});

app.post('/add', isloggedIn, CHECKALL(), (req, res) => {
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

app.put('/edit',isloggedIn, CHECKALL(), (req, res) => {
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

app.put('/mark',isloggedIn, [
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

app.delete('/delete', isloggedIn,[check('id').isDecimal(),], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    dao.DeleteById(req.body.id)
        .then(msg => res.json(msg))
        .catch(err => console.log(err));
})

app.post('/sessions', function(req, res, next) {
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

// DELETE /sessions/current 
// logout
app.delete('/sessions/current', (req, res) => {
    req.logout( ()=> { res.end(); } );
  });
  
  // GET /sessions/current
  // check whether the user is logged in or not
  app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
      res.status(200).json(req.user);}
    else
      res.status(401).json({error: 'Unauthenticated user!'});;
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));