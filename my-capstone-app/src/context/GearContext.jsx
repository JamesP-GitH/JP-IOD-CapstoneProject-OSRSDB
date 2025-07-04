"use client";

import React from "react";
import { createContext, useState } from "react";

export const GearContext = createContext();

const initialGear = {
    ammo: null,
    body: null,
    cape: null,
    feet: null,
    hands: null,
    head: null,
    legs: null,
    neck: null,
    ring: null,
    shield: null,
    weapon: null,
};

export function GearProvider({ children }) {
    const [gear, setGearState] = useState(initialGear);

    function setGear(slot, item) {
        setGearState((currentState) => ({
            ...currentState,
            [slot]: item,
        }));
    }

    function resetGear() {
        setGearState(initialGear);
    }

    return <GearContext.Provider value={{ gear, setGear, resetGear }}>{children}</GearContext.Provider>;
}
