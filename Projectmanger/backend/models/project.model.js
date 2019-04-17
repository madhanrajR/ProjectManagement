var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    projectID:{
        type: String,
        required: true,
        unique: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    projectDescription:{ 
        type: String,
        required:true
    },
    // Date: Date.now()
})

module.exports = mongoose.model('Project',ProjectSchema);