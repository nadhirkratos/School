const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    name: String,
    description: String,
    duration: String,
    photo: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

})

const Course = mongoose.model("Course", courseSchema)
module.exports = Course