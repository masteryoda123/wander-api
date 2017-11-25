import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

import routes from './routes'

const app = express();
const portNum = process.env.PORT || 8000;



// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// TODO: Session timeout
app.use(session({
  secret: 'secret',
  saveUnitialized: true,
  resave: true
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());


// Views
app.use('/static', express.static(`${__dirname}/../static`));
app.set('views', `${__dirname}/../static/html`);
app.set('view engine', 'ejs');






passport.use(new LocalStrategy((username, password, done) => {
  models.User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      return done(null, false, {message: 'User not found!'});
    }

    if (!user.verifyPassword(password)) {
      return done(null, false, { message: 'Invalid password!' });
    }

    return done(null, user);
  }).catch((err) => {
    throw err;
  })

}));

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user)
  }).catch((err) => {
    done(err, null)
  })
});








// routes
app.use('/', routes)


app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log(`Serving port number ${portNum}`)
  }
});
