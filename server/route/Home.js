const express = require("express")
const router = express.Router()
const { Add, Read, Update, Delete } = require("../controller/Home")
const { sendNotification } = require("../utils/send_notifation")

router.post('/add', Add)
router.get('/read', Read)
router.put('/update', Update)
router.delete('/delete', Delete)
router.post('/send-notification', sendNotification)

module.exports = router