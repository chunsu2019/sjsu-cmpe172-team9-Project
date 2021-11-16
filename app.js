const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')

const User = require('./models/user')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const facebookStrategy = require('passport-facebook')
const mongoose = require('mongoose')
//const expressLayouts = require('express-ejs-layouts')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')


//
require('dotenv').config()

// MongoDB
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection eror:"));
db.once("open", () => {
    console.log("Database connected");
});

//
const { runInNewContext } = require('vm')

//
app.engine('ejs', ejsMate)

//
app.set('view engine', 'ejs')

//
//app.use(expressLayouts)

//Sessions
const sessionConfig = {
    secret: 'this should be secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

//Flash
app.use(flash())

//flash middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

//
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new facebookStrategy({
    clientID: "239419804806945",
    clientSecret: "f8e708684fc6cd2d6c50c48b4bf937c3",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        })
    }
))

// static files
app.use(express.static(path.join(__dirname + '/public')))

//router
const accountRouter = require('./routes/account')
const user = require('./models/user')
const { networkInterfaces } = require('os')

// routes
app.use('/account', accountRouter)


//
app.get('/', (req, res) => {
    res.redirect("/login_page")
})

//Home -> login/signup
app.get('/login_page', (req, res) => {
    res.render("users/login_page")
})

app.get('/register_page', (req, res) => {
    res.render("users/register_page")
})

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login_page', failureFlash: true }),
    (req, res) => {
        req.flash('success', 'Welcome Back')
        res.redirect('/account')
});

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!')
    res.redirect('/login_page')
})

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        newUser = new User({ username: username, password: password })
        await User.register(newUser, password, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                res.send('/login_page')
            }
        })
    } catch (e) {
        console.log(e)
    }
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found...', 404))
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})