const express = require("express")
const HttpError = require("../models/HttpErrors")
const router = express.Router()
const { Add ,Read,Update,Delete} = require("../controller/Home")


router.post('/add', Add)
router.get('/read', Read)
router.put('/update', Update)
router.delete('/delete', Delete)

module.exports = router