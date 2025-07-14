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

        let ignore = false;
        dispatch({ type: "FETCH_START" });

        async function fetchData() {
            try {
                const response = await fetch(`/api/${slot}`);
                if (!response.ok) {
                    throw new Error(`Error fetching ${slot}: ${response.statusText}`);
                }
                const data = await response.json();

                if (!ignore) {
                    dispatch({ type: "FETCH_SUCCESS", payload: data });
                    console.log(`Success loading: ${slot}`);
                }
            } catch (error) {
                if (!ignore) {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                    console.error(error.message);
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
