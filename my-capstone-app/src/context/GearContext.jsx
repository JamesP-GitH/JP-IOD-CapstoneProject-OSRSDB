"use client";

import React from "react";
import { createContext, useState } from "react";

// Create the context object
export const GearContext = createContext();

// Define the default gear state (all slots empty)
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

// GearProvider component to wrap around parts of the app that need gear state
export function GearProvider({ children }) {
    const [gear, setGearState] = useState(initialGear);

    // Update a specific gear slot with a new item
    function setGear(slot, item) {
        setGearState((currentState) => ({
            ...currentState,
            [slot]: item,
        }));
    }

    // Reset all gear slots to initial (empty) state
    function resetGear() {
        setGearState(initialGear);
    }

    // Provide gear state and handlers to children components
    return <GearContext.Provider value={{ gear, setGear, resetGear }}>{children}</GearContext.Provider>;
}
