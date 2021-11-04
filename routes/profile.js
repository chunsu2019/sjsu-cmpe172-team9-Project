const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('account/profile_page')
})


module.exports = router