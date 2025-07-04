"use strict";
let Models = require("../models");

// Get all hand items
const getAllHands = (req, res) => {
    Models.Hand.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single hand item by its ID
const getHandById = (req, res) => {
    Models.Hand.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Hand not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};
// Get hand items by name
const getHandByName = (req, res) => {
    Models.Hand.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No hands found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all hand names only
const getHandNames = (req, res) => {
    Models.Hand.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new hand item
const createHand = (req, res) => {
    const newHand = new Models.Hand(req.body);
    newHand
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing hand item by ID
const updateHand = (req, res) => {
    Models.Hand.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a hand item by ID
const deleteHand = (req, res) => {
    Models.Hand.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllHands,
    getHandById,
    getHandByName,
    getHandNames,
    createHand,
    updateHand,
    deleteHand,
};
