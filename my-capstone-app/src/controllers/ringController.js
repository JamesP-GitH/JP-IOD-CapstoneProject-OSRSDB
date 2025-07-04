"use strict";
let Models = require("../models");

// Get all ring items
const getAllRings = (req, res) => {
    Models.Ring.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single ring item by its ID
const getRingById = (req, res) => {
    Models.Ring.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Ring not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};
// Get ring items by name
const getRingByName = (req, res) => {
    Models.Ring.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No rings found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all ring names only
const getRingNames = (req, res) => {
    Models.Ring.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new ring item
const createRing = (req, res) => {
    const newRing = new Models.Ring(req.body);
    newRing
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing ring item by ID
const updateRing = (req, res) => {
    Models.Ring.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a ring item by ID
const deleteRing = (req, res) => {
    Models.Ring.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllRings,
    getRingById,
    getRingByName,
    getRingNames,
    createRing,
    updateRing,
    deleteRing,
};
