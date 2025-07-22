"use client";

import React, { useEffect, useReducer } from "react";

// Initial state for the reducer
const initialState = {
    data: {}, // Will hold fetched gear items
    loading: true, // Indicates loading state
    error: null, // Stores any error message
};

// Reducer function to handle async states
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

// Custom hook to fetch gear items for a specific slot
function useGearItems(slot) {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    useEffect(() => {
        // If no slot is selected, don't fetch anything
        if (!slot) return;

        let ignore = false; // Helps prevent state update on unmounted component
        dispatch({ type: "FETCH_START" });

        async function fetchData() {
            try {
                const response = await fetch(`/api/${slot}`); // Fetch items from backend
                if (!response.ok) {
                    throw new Error(`Error fetching ${slot}: ${response.statusText}`);
                }
                const data = await response.json();

                // Only update state if component is still mounted
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

        // Cleanup function to prevent state update after unmount
        return () => {
            ignore = true;
        };
    }, [slot]); // Re-run effect when the slot changes

    return state; // { data, loading, error }
}

export default useGearItems;
