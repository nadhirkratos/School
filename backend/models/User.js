const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    address: String,
    password: String,
    role: String,
    photo: String,
    phoneNumberOfChild: Number,
    cv: String,
    speciality: String,
    isEnrolledIn: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    score: Number,
    notes: String,

})

const User = mongoose.model("User", userSchema)
module.exports = User