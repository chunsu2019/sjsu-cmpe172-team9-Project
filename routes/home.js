const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('account/home')
})

router.get('/profile', (req, res) => {
    res.render('account/profile_page')
})

router.get('/text', (req, res) => {
    res.render('account/text_page')
})

module.exports = router