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


router.get('/', isLoggedIn, (req, res) => {
    res.render('account/home')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('account/profile_page')
})

router.get('/view_story', isLoggedIn, async(req, res) => {
    const story = await Story.find({})
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
    const story = await Story.findById(id)

    const blockData = JSON.parse(story.storyBlock)

    const cleanData = {
        blocks: blockData
    }

    const edjsParser = edjsHTML()
    const html = edjsParser.parse(cleanData)

    res.render('story/read_story', {html})
})

router.post('/new_story/save_image', isLoggedIn, upload.single('image'), async (req, res) => {
    url = "https://api.imgbb.com/1/upload?key=8f61dd89847beb92535bc8d7d3092723"
    imgString = req.file.buffer.toString('base64')

    const payload = {
        apiKey: "8f61dd89847beb92535bc8d7d3092723",
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

module.exports = router