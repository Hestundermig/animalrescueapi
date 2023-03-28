const express = require("express")
const router = express.Router()
const Animal = require("../models/animals.model")
const auth = require("../authMiddleware")

router.get("/animals", async function (request, response, next) {
    try {
        let result = await Animal.find();
        return response.status(200).json(result)
    } catch (error) {
        return next(error)
    }
});

router.get("/animals/:id", auth, async function (request, response, next) {
    try {
        let result = await Animal.findById(request.params.id);
        return response.status(200).json(result)
    } catch (error) {

    }
});

// adde et dyr
router.post("/animals", auth, async function (request, response, next) {
    try {
        let animal = await Animal.create(request.body)
        return response.status(201).json(animal)
    } catch (error) {
        return next(error)
    }
})

// Opdater et dyr, ved brug af id
router.patch("/animals/:id", async function (request, response, next) {
    try {
        let animal = await Animal.findByIdAndUpdate(request.params.id, request.body, { new: true })
        return response.status(200).json(animal)
    } catch (err) {
        return next(err)
    }
})

// slet et dyr, ved brug af id
router.delete("/animals/:id", async function (request, response, next) {
    try {
        await Animal.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } catch (error) {
        return next(error)
    }
})

module.exports = router;