"use client";

import React, { useEffect, useReducer } from "react";

const initialState = {
    data: {},
    loading: true,
    error: null,
};

function dataReducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null, data: {} };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, data: action.payload };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function useGearItems(slot) {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    useEffect(() => {
        if (!slot) return;

        const slotDataLocation = `/data/items-${slot}.json`;
        let ignore = false;

        dispatch({ type: "FETCH_START" });

        async function fetchData() {
            try {
                let data = {};

                if (slot === "weapon") {
                    const [oneHanded, twoHanded] = await Promise.all([
                        fetch("/data/items-weapon.json").then((res) => {
                            if (!res.ok) throw new Error("Failed to load one-handed weapons");
                            return res.json();
                        }),
                        fetch("/data/items-2h.json").then((res) => {
                            if (!res.ok) throw new Error("Failed to load two-handed weapons");
                            return res.json();
                        }),
                    ]);

                    data = { ...oneHanded, ...twoHanded };
                } else {
                    const res = await fetch(`/data/items-${slot}.json`);
                    if (!res.ok) throw new Error(`Failed to load ${slot}`);
                    data = await res.json();
                }

                if (!ignore) {
                    dispatch({ type: "FETCH_SUCCESS", payload: data });
                    console.log(`Success loading: ${slot}`);
                }
            } catch (error) {
                if (!ignore) {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                }
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };
    }, [slot]);
    return state;
}

export default useGearItems;
