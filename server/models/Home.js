const mongoose = require("mongoose")
const Schema = mongoose.Schema

const crudSchema = new Schema({
    title: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("data", crudSchema)