var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
        userID: {
        type: String,
        required: true,
        unique: true,
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    myimage:{
        type: String,
        default:"Dont_Delete_This_Picture.png"
    },
    roles:{
        type: String,
        enum: ['admin','developer'],
        // admin,
        // developer
        default: 'developer'
    },
    username:{
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('User',userSchema);