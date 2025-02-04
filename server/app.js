const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classroom');
const courseRoutes = require('./routes/course');
const resourceRoutes = require('./routes/resource');
const forumRoutes = require('./routes/forum');


app.use('/auth', authRoutes);
app.use('/classes', classroomRoutes);
app.use('/courses', courseRoutes);
app.use('/resources', resourceRoutes);
app.use('/forum', forumRoutes);

// if ( process.env.NODE_ENV === "production" || 1) { 
//     app.use(express.static(path.join(__dirname, "../client/build"))); 
//     app.get("*", (req, res) => { 
//         res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')); 
//     })
// }

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({message: message});
})

mongoose.connect('mongodb+srv://admin:987654321@cluster0.edmu2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})
.then(result => {
    app.listen(process.env.PORT || 5000);
    console.log("Server started at port 5000");
    console.log("http://localhost:5000");
})
.catch(err => {
    console.log(err);
})

// https://localhost:5000/auth/login -> post
// https://localhost:5000/auth/signup -> put