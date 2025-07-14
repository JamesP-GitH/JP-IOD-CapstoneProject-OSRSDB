const weaponController = require("./weaponController");
const shieldController = require("./shieldController");
const headController = require("./headController");
const handController = require("./handController");
const bodyController = require("./bodyController");
const capeController = require("./capeController");
const ammoController = require("./ammoController");
const feetController = require("./feetController");
const legController = require("./legController");
const neckController = require("./neckController");
const ringController = require("./ringController");

const { Weapon, Shield, Head, Hand, Body, Cape, Ammo, Feet, Leg, Neck, Ring } = require("@/models");

const itemModels = [Weapon, Shield, Head, Hand, Body, Cape, Ammo, Feet, Leg, Neck, Ring];

// Generic search across all gear slot models
async function getItemById(id) {
    for (const model of itemModels) {
        const item = await model.findById(id);
        if (item) return item;
    }
    return null;
}

module.exports = {
    weaponController,
    shieldController,
    headController,
    handController,
    bodyController,
    capeController,
    ammoController,
    feetController,
    legController,
    neckController,
    ringController,
    getItemById,
};
