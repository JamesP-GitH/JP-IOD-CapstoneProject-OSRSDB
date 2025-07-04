"use strict";
let Models = require("../models");

// Get all feet items
const getAllFeets = (req, res) => {
    Models.Feet.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single feet item by its ID
const getFeetById = (req, res) => {
    Models.Feet.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Feet not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get feet items by name
const getFeetByName = (req, res) => {
    Models.Feet.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No feets found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all feet names only
const getFeetNames = (req, res) => {
    Models.Feet.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new feet item
const createFeet = (req, res) => {
    const newFeet = new Models.Feet(req.body);
    newFeet
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing feet item by ID
const updateFeet = (req, res) => {
    Models.Feet.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a feet item by ID
const deleteFeet = (req, res) => {
    Models.Feet.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllFeets,
    getFeetById,
    getFeetByName,
    getFeetNames,
    createFeet,
    updateFeet,
    deleteFeet,
};
