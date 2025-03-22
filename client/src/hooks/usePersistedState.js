// We name it like this because we want it to be kind of like useState
// This name talks a bit more about its purpose, while "useLocalStorage" talks about the implementation
// When we are thinking in functional programming, or declarative programing, we souldn't think how the problem is solved, we should think what problem it solves

import { useState } from "react";

// Since this works like useState, we will copy its API

// initialState - an initial value
// useState can also accept a function, which will executed on the initialising of the state
export default function usePersistedState(initialState) {
    // Principle of refactoring: we create the minimum needed to make the code work and move towards refactoring without breaking our project - every step of refactoring should keep the project in a working state
    const [state, setState] = useState(() => {
        // Read:
        // 1. Read the state from the local storage
        const persistedState = localStorage.getItem("auth");
        // 2. If we don't have a persisted state, then return the initial state
        if (!persistedState) {
            return initialState;
        }

        // 3. If we do have a persisted state, then we need to parse it
        const persistedStateData = JSON.parse(persistedState);

        // 4. Return the parsed persisted state / set the value of `state` to be that of `persistedStateData` - this will be the initial value of the "state" variable. This makes the initialState not quite the initial value, but the value from the local storage
        return persistedStateData;
    });

    // Write:
    // 1. A function which will imitate the setState function. Holds the data value. This function is a wrapper of the setState function. We do this so we can add another proccess to setting the state - saving the state to the local storage
    function setPersistedState(data) {
        // 2. Stringify the data we will store
        const persistedData = JSON.stringify(data);
        // 3. Save/update the data to the local storage
        localStorage.setItem("auth", persistedData);
        // 4. Lastly, we set the data to the state, which will trigger the reaction from React
        setState(data);
    }

    // We return an array with the state (persisted state) and the setPersistedState function
    return [state, setPersistedState];
}