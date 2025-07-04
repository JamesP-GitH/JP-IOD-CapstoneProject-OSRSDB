"use strict";
let Models = require("../models");

// Get all body items
const getAllBodies = (req, res) => {
    Models.Body.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single body item by its ID
const getBodyById = (req, res) => {
    Models.Body.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Body not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};
// Get body items by name
const getBodyByName = (req, res) => {
    Models.Body.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No bodies found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all body names only
const getBodyNames = (req, res) => {
    Models.Body.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new body item
const createBody = (req, res) => {
    const newBody = new Models.Body(req.body);
    newBody
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing body item by ID
const updateBody = (req, res) => {
    Models.Body.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a body item by ID
const deleteBody = (req, res) => {
    Models.Body.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllBodies,
    getBodyById,
    getBodyByName,
    getBodyNames,
    createBody,
    updateBody,
    deleteBody,
};
