const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema({})

UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema)
