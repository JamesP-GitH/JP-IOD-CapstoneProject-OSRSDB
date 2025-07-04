"use strict";
let Models = require("../models");

// Get all ammo items
const getAllAmmos = (req, res) => {
    Models.Ammo.find({})
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get a single ammo item by its ID
const getAmmoById = (req, res) => {
    Models.Ammo.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ result: 404, message: "Ammo not found" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get ammo items by name
const getAmmoByName = (req, res) => {
    Models.Ammo.find({ name: { $regex: req.params.name, $options: "i" } })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No ammos found matching that name" });
            }
            res.send({ result: 200, data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Get all ammo names only
const getAmmoNames = (req, res) => {
    Models.Ammo.find({}, { name: 1, _id: 0 })
        .then((data) => {
            const names = data.map((item) => item.name);
            res.send({ result: 200, data: names });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Create a new ammo item
const createAmmo = (req, res) => {
    const newAmmo = new Models.Ammo(req.body);
    newAmmo
        .save()
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Update an existing ammo item by ID
const updateAmmo = (req, res) => {
    Models.Ammo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// Delete an ammo item by ID
const deleteAmmo = (req, res) => {
    Models.Ammo.findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getAllAmmos,
    getAmmoById,
    getAmmoByName,
    getAmmoNames,
    createAmmo,
    updateAmmo,
    deleteAmmo,
};
