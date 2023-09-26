const Crud = require("../models/Home")
const HttpError = require("../models/HttpErrors")
const Add = async (req, res, next) => {
    const { title } = req.body

    console.log(req.field);
    // res.status(201).json({ message: `title ${title} added successfully`, status: 1 })

    const crud = new Crud({
        title
    })
    try {
        await crud.save()
        res.status(201).json({ message: "title added successfully", status: 1 })
    } catch (error) {
        // console.log(error);
        return next(
            new HttpError('Failed to add this title, please try again', 500)
        )
    }
}
const Read = async (req, res, next) => {
    // res.status(201).json({ message: `title ${title} added successfully`, status: 1 })
    const cruds = await Crud.find()
    try {
        res.status(201).json({ cruds, status: 1 })
    } catch (error) {
        // console.log(error);
        return next(
            new HttpError('Failed to read titles, please try again', 500)
        )
    }
}

const Update = async (req, res, next) => {
    const { title, id } = req.body
    // const crud = await Crud.findById(id)
    try {
        // crud.title = title
        // await crud.save()
        await Crud.updateOne({ _id: id }, { $set: { title: title } })
        res.status(201).json({ message: "title updated successfully", status: 1 })
    } catch (error) {
        // console.log(error);
        return next(
            new HttpError('Failed to update this title, please try again', 500)
        )
    }
}

const Delete = async (req, res, next) => {
    const { id } = req.body

    try {
        await Crud.findByIdAndDelete(id)
        // await crud.save()
        res.status(201).json({ message: "title deleted successfully", status: 1 })

    } catch (error) {
        return next(
            new HttpError('Failed to delete this title, please try again', 500)
        )
    }
}

exports.Add = Add
exports.Update = Update
exports.Read = Read
exports.Delete = Delete