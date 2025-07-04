"use strict";
let Models = require("../models");

// Get all neck items
const getAllNecks = (req, res) => {
    Models.Neck.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single neck item by its ID
const getNeckById = (req, res) => {
    Models.Neck.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Neck not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};
// Get neck items by name
const getNeckByName = (req, res) => {
    Models.Neck.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No necks found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all neck names only
const getNeckNames = (req, res) => {
    Models.Neck.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new neck item
const createNeck = (req, res) => {
    const newNeck = new Models.Neck(req.body);
    newNeck
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing neck item by ID
const updateNeck = (req, res) => {
    Models.Neck.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a neck item by ID
const deleteNeck = (req, res) => {
    Models.Neck.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllNecks,
    getNeckById,
    getNeckByName,
    getNeckNames,
    createNeck,
    updateNeck,
    deleteNeck,
};
