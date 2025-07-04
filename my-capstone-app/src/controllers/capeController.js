"use strict";
let Models = require("../models");

// Get all cape items
const getAllCapes = (req, res) => {
    Models.Cape.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single cape item by its ID
const getCapeById = (req, res) => {
    Models.Cape.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Cape not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get cape items by name
const getCapeByName = (req, res) => {
    Models.Cape.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No capes found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all cape names only
const getCapeNames = (req, res) => {
    Models.Cape.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new cape item
const createCape = (req, res) => {
    const newCape = new Models.Cape(req.body);
    newCape
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing cape item by ID
const updateCape = (req, res) => {
    Models.Cape.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete a cape item by ID
const deleteCape = (req, res) => {
    Models.Cape.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllCapes,
    getCapeById,
    getCapeByName,
    getCapeNames,
    createCape,
    updateCape,
    deleteCape,
};
