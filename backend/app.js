///////////////////////// module importations ////////////////////////
// import express module after i installed it
const express = require("express");
// import body parser module after i installed it
const bodyParser = require("body-parser")

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB');

//  import express-session module after i installed it
const session = require('express-session');

// import bcrypt module after i installed it
const bcrypt = require("bcrypt");

// import jsonwebtoken module after i installed it
const jwt = require('jsonwebtoken');

// import multer module after i installed it 
const multer = require("multer")

// import path module (doesn't require instalation)
const path = require("path")

//  importing cors module after i installed it 
const cors = require("cors")


///////////////////////// Express Application ////////////////////////
//  creates express application
const app = express();


///////////////////////// App Configuration //////////////////////////
// send response with JSON format BackEnd to FrontEnd
app.use(bodyParser.json())

// get object from request (PUT,POST)
app.use(bodyParser.urlencoded({ extended: true }))

// Security configuration ( from abd rahman's code )

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, DELETE, OPTIONS, PATCH, PUT"
//     );
//     next();
// });

//  security configuration
app.use(cors())




// session configuration
const secretKey = 'croco-venus-24';
app.use(session({
    secret: secretKey,
}));

// multer configuration
app.use('/files', express.static(path.join('backend/uploads')))
// app.use('/cv', express.static(path.join('backend/uploads/cv')))
// app.use('/videos', express.static(path.join('backend/uploads/videos')))
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "application/pdf": "pdf",
    "video/mp4": "mp4",
}
// const MIME_TYPE_VIDEOS = {
//     "video/mp4": "mp4",
// }
// const MIME_TYPE_CV = {
//     "application/pdf": "pdf",
// }

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];

        if (isValid) {
            cb(null, 'backend/uploads')
        }


    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const nameOfFile = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, nameOfFile);
    }
});



// make app exportable
module.exports = app;



// models
const User = require("./models/User")
const Course = require("./models/Course")


// //////////////////////////Querries/////////////////////////////// //
// add a student with his image  (signup )
app.post("/students", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) {
            res.json({ registred: false, msg: "user exists already" })
        } else {
            bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                req.body.password = cryptedPassword
                req.body.photo = `http://localhost:3000/files/${req.file.filename}`
                let userObj = new User(req.body)
                userObj.save()
                res.json({ registred: true, msg: "user is added successfuly" })
            })
        }
    })
})
// add a teacher with his image and his cv (signup )
app.post("/teachers", multer({ storage: storageConfig }).fields([{ name: "photo" }, { name: "cv" }]), (req, res) => {
    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) {
            res.json({ registred: false, msg: "user exists already" })
        } else {
            bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                req.body.password = cryptedPassword
                req.body.photo = `http://localhost:3000/files/${req.files.photo[0].filename}`
                req.body.cv = `http://localhost:3000/files/${req.files.cv[0].filename}`
                let userObj = new User(req.body)
                userObj.save()
                res.json({ registred: true, msg: "user is added successfuly" })
            })
        }
    })
})
// add a parent with his image (signup )
app.post("/parents", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) {
            res.json({ registred: false, msg: "user exists already" })
        } else {
            bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                req.body.password = cryptedPassword
                req.body.photo = `http://localhost:3000/files/${req.file.filename}`
                let userObj = new User(req.body)
                userObj.save()
                res.json({ registred: true, msg: "user is added successfuly" })
            })
        }
    })
})

// login
app.post("/login", ((req, res) => {
    User.findOne({ phoneNumber: req.body.phoneNumber }).then((doc) => {
        if (!doc) {
            res.json({ msg: "the phoneNumber doesn't exist" })
        } else {
            bcrypt.compare(req.body.password, doc.password).then((foundedPassword) => {
                if (!foundedPassword) {
                    res.json({ msg: "the password doesn't match the phoneNumber" })
                } else {
                    if (doc.role == "student") {
                        const token = jwt.sign({
                            id: doc._id,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            address: doc.address,
                            email: doc.email,
                            phoneNumber: doc.phoneNumber,
                            role: doc.role,
                            photo: doc.photo,
                        },
                            secretKey, {
                            expiresIn: "10h"
                        })
                        res.json({ msg: "the connected user is a student", token: token })
                    }
                    else if (doc.role == "teacher") {
                        const token = jwt.sign({
                            id: doc._id,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            email: doc.email,
                            phoneNumber: doc.phoneNumber,
                            address: doc.address,
                            role: doc.role,
                            photo: doc.photo,
                            cv: doc.cv,
                            speciality: doc.speciality,
                        },
                            secretKey, {
                            expiresIn: "10h"
                        })
                        res.json({ msg: "the connected user is a teacher", token: token })
                    }
                    else if (doc.role == "parent") {
                        const token = jwt.sign({
                            id: doc._id,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            email: doc.email,
                            phoneNumber: doc.phoneNumber,
                            address: doc.address,
                            role: doc.role,
                            photo: doc.photo,
                            phoneNumberOfChild: doc.phoneNumberOfChild,

                        },
                            secretKey, {
                            expiresIn: "10h"
                        })
                        res.json({ msg: "the connected user is a parent", token: token })
                    }
                    else {
                        const token = jwt.sign({
                            id: doc._id,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            email: doc.email,
                            phoneNumber: doc.phoneNumber,
                            address: doc.address,
                            role: "admin",
                            photo: doc.photo,
                            phoneNumberOfChild: doc.phoneNumberOfChild,
                            cv: doc.cv,
                            speciality: doc.speciality,
                        },
                            secretKey, {
                            expiresIn: "10h"
                        })
                        res.json({ msg: "the connected user is an admin", token: token })
                    }

                }
            })

        }
    })
}))


// admin get all users
app.get("/users", (req, res) => {
    User.find().then((doc) => {
        res.json({ msg: "these are all users", users: doc })
    })
})

// admin get user
app.get("/user/:id", (req, res) => {
    let id = req.params.id
    User.findById(id).populate("isEnrolledIn").then((doc) => {
        res.json({ msg: "here's your requested user", user: doc })
    })
})

// admin update one user
app.post("/user", (req, res) => {
    let id = req.body.id;
    User.findByIdAndUpdate(id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        role: req.body.role,
        isEnrolledIn: req.body.isEnrolledIn,
    })
        .then((doc) => {
            res.json({ msg: "user is updated succesfully", updatedUser: doc })
        })
})

// admin delete a user
app.delete("/user/:id", (req, res) => {
    let id = req.params.id;
    User.findByIdAndDelete(id).then((doc) => {
        if (doc) {
            res.json({ msg: "user is deleted succesfully" })
        } else {
            res.json({ msg: "user is not found in the data base or not deleted" })
        }
    })
})

// getAllTeachers
app.get("/teachers", (req, res) => {
    User.find({ role: "teacher" }).then((doc) => {
        res.json({ msg: "these are all Teachers", teachers: doc })
    })
})


// search for teacher by name or speciality
app.post("/teacher", (req, res) => {
    let sValue = req.body.searchValue
    if (sValue.length > 0) {
        User.find({
            $or: [
                { firstName: { $regex: sValue, $options: 'i' } },
                { lastName: { $regex: sValue, $options: 'i' } },
                { speciality: { $regex: sValue, $options: 'i' } },
            ]
        })
            .then((doc) => {
                if (doc.length > 0) {
                    console.log("this doc.length is equal to : ", doc.length);
                    console.log("this is the doc : ", doc);
                    res.json({ teachers: doc, founded: true, msg: "teacher(s) is/are found" })
                } else {
                    res.json({ founded: false, msg: "no teacher match your search" })
                }
            })
    } else {
        res.json({ founded: false, msg: "no teacher match your search" })
    }
})





// add course
app.post("/course", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    req.body.photo = `http://localhost:3000/files/${req.file.filename}`
    let courseObj = new Course(req.body)
    courseObj.save().then((doc) => {

        if (!doc) {
            res.json({ msg: "course in not added" })
        } else {
            res.json({ msg: "course is added succesfully" })
        }

    })
})


// get all Courses
app.get("/courses", (req, res) => {
    Course.find().populate("teacher").then((doc) => {
        res.json({ courses: doc })
    })
})

// get course by id
app.get("/course/:id", (req, res) => {
    let id = req.params.id
    Course.findById(id).populate("teacher").then((doc) => {
        res.json({ course: doc })
    })
})

// editCourse
app.post("/editCourse", (req, res) => {
    let id = req.body.id
    let editedCourse = req.body
    Course.findByIdAndUpdate(id, {
        name: editedCourse.name,
        description: editedCourse.description,
        duration: editedCourse.duration,
        teacher: editedCourse.teacher,
    }
    ).then((doc) => {
        if (doc) {
            res.json({ course: doc, msg: "courses is edited with success" })
        } else {
            res.json({ msg: "courses is NOT edited" })
        }
    })
})

// deleteCourse by id
app.delete("/course/:id", (req, res) => {
    let id = req.params.id
    Course.findByIdAndDelete(id).then((doc) => {
        if (doc) {
            res.json({ deleted: true, msg: "course is deleted" })
        }
        else if (!doc) {
            res.json({ deleted: false, msg: "course is not deleted" })
        }
    })

    // Course.findById(id).then((doc) => {
    //     photoDestination = doc.photo


    // })

})



// teacherGetsAllHisStudents
app.post("/studentsOfTeacher", (req, res) => {
    let connectedUserId = req.body.connectedUserId
    console.log(connectedUserId);

    Course.find({ teacher: connectedUserId }).then((courses) => {
        let coursesIds = courses.map(course => course._id)
        User.find({ isEnrolledIn: { $in: coursesIds } }).populate("isEnrolledIn").then((doc) => {
            res.json({ students: doc })
        })
    })

})


// update score and note of a student
app.post("/updateScoreAndNote", (req, res) => {
    let id = req.body.id
    User.findByIdAndUpdate(id, { score: req.body.score, notes: req.body.notes }).then((doc) => {
        if (doc) {
            res.json({ msg: "updated successfuly" })
        }
        else {
            res.json({ msg: "not updated" })
        }
    })
})


// findStudentByPhoneNumber
app.post("/findStudent", (req, res) => {
    phoneNumberOfChild = req.body.phoneNumberOfChild
    console.log(phoneNumberOfChild);
    User.findOne({ phoneNumber: phoneNumberOfChild  }).then((doc) => {
        if (doc) {
            console.log(doc);
            res.json({ student: doc, founded: true, msg: "student is Found" })
        }
        else {
            res.json({ founded: false, msg: "student is not found" })
        }
    })
})

