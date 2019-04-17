var mongoose = require('mongoose');
var User = require('./user.model');
var Project = require('./project.model');

var trackSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
  
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required: true
    // },
    // project:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Project',
    //     required: true
    // },
    user:{
        type: String
    },
    project:{
        type: String
    },
    recorddate:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    userDescription:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('TrackProject',trackSchema);