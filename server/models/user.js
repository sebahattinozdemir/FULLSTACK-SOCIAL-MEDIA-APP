const mongoose = require('mongoose')
const {ObjectId} = require("mongodb");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    email: {
       type: String,
       required: true,
        default:"",
        minlength: 5,
    },
        password: {
            type: String,
            required: true,
            default:"",
            minlength: 5,
        },
    profilePicture: {
        type: String,
        default:""
    },
    coverPicture: {
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default:[]
    },
    followings: {
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: '',
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
        from: {
            type: String,
            maxlength: 50
        },
    relationship: {
        type: Number,
        enum: [1,2,3]
    }
},
{timestamps: true}
)

module.exports = mongoose.model('User', UserSchema)