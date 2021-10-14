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
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

//
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//router
const textRouter = require('./routes/text')

// routes
app.use('/account', textRouter)

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


//Home -> login/signup
app.get('/login_page', (req, res) => {
    res.render("users/login_page")
})

app.get('/register_page', (req, res) => {
    res.render("users/register_page")
})

//remove later
app.get('/failed message', (req, res) => {
    res.send('Not a valid user')
})

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/account' }),
    function (req, res) {
        req.flash('success', 'welcome')
        res.redirect('/account')
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body)
        newUser = new User({ username: username, password: password })
        await User.register(newUser, password, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                res.send('/account')
            }
        })
    } catch (e) {
        console.log(e)
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})