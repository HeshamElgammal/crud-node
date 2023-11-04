const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require('multer');
const mongoose = require("mongoose")
const fs = require("fs");


var upload = multer();
const app = express()


const HttpError = require("./server/models/HttpErrors")
const crudRoutes = require("./server/route/Home")



app.use(cors())
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin", "*"
    )
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Authorization, multipart/form-data"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );

    next();
})


// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));
// app.use("/uploads/images", express.static(path.join("uploads", "images")));

// routes
app.use("/v1/crud", crudRoutes)
// if get route not found
app.use(() => {
    throw new HttpError("couldn't find this route", 404);
});
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (req.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured", status: 0 });
});
const PORT = 3000


mongoose.connect('mongodb://localhost:27017', {
    dbName: "CRUD",
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    app.listen(PORT, () => {
        console.log(`Hello on server with port: ${PORT}`);
    })
})
    .catch(e => {
        console.log(e);
    });


module.exports = app;