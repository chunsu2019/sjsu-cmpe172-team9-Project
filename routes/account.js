const { response } = require('express')
const express = require('express')
const multer = require('multer')
const router = express.Router()
const Story = require('../models/story')
const upload = multer()
const imgbbUploader = require('imgbb-uploader')
const Axio = require('axios')
const { default: axios } = require('axios')
const FormData = require('form-data')
const User = require('../models/user')
const {isLoggedIn} = require('../middleware')
const story = require('../models/story')

const edjsHTML = require('editorjs-html')
const Review = require('../models/review')


router.get('/', isLoggedIn, (req, res) => {
    res.render('account/home')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('account/profile_page')
})

router.get('/view_story', isLoggedIn, async(req, res) => {
    const story = await Story.find({}).populate('reviews')

    res.render('story/view_story', {story})
})

router.get('/new_story', isLoggedIn, (req, res) => {
    res.render('story/new_story')
})

router.post('/write_story', isLoggedIn, async(req, res) => {
    const story = new Story()
    story.title = req.body.title
    story.storyBlock = req.body.storyInput
    story.author = req.user._id

    await story.save()

    res.redirect('/account')
})

router.post('/update_story/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params
    const story = await Story.findById(id)
    story.title = req.body.title
    story.storyBlock = req.body.storyInput
    
    await story.save()

    res.redirect('/account/my_story')
} )

router.get('/my_story', isLoggedIn, async(req, res) => {
    const story = await Story.find({'author': req.user._id})
    res.render('story/my_story', {story})
})

router.get('/edit_story/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params
    const story = await Story.findById(id)
    const blockData = JSON.parse(story.storyBlock)

    const cleanData = JSON.stringify({
        blocks: blockData
    })

    const title = story.title

    res.render('story/edit_story', {cleanData, title, id})
})

router.get('/read_story/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params
    const story = await Story.findById(id).populate('reviews')

    const blockData = JSON.parse(story.storyBlock)

    const cleanData = {
        blocks: blockData
    }

    const edjsParser = edjsHTML()
    const html = edjsParser.parse(cleanData)


    //check if reader is author
    let isAuthor = new Boolean() 

    if (req.user._id.toString() == story.author._id.toString()) {
        isAuthor = true
    }
    else {
        isAuthor = false
    }

    res.render('story/read_story', {id, html, isAuthor, story})
})

router.post('/new_story/save_image', isLoggedIn, upload.single('image'), async (req, res) => {
    url = process.env.IMGBB_URL
    imgString = req.file.buffer.toString('base64')

    const payload = {
        apiKey: process.env.IMGBB_API_KEY,
        base64string: imgString
    }

    imgBB = await imgbbUploader(payload)
        .then((response) =>{
            res.json({
                success: 1,
                file: {        
                    url: response.image.url
                }
        
            })
        })
        .catch(error => console.log(error))


})

router.post('/:id/write_review', isLoggedIn, async(req, res) => {
    const story = await Story.findById(req.params.id).populate('reviews')
    const review = new Review()
    review.body = req.body.review
    review.rating = req.body.rating

    story.reviews.push(review)

    //calculate average review
    let avgRating = 0
    story.reviews.forEach(review => {
        avgRating += review.rating
    });

    avgRating /= story.reviews.length

    story.avgRating = Math.round(avgRating)

    await review.save()
    await story.save()

    res.redirect('/account/read_story/' + req.params.id)
}) 


module.exports = router