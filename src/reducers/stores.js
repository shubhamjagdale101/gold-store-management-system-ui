import { createSlice } from "@reduxjs/toolkit";
import { resetAdmin } from './admin';

const storesSlice = createSlice({
    name: "stores",
    initialState: {
        stores: [],
        isLoading: false,
        error: null,
        loading: false,
    },
    reducers: {
        setStores: (state, action) => {
            state.stores = action.payload?.data?.stores;
            state.isLoading = false;
            state.error = null;
        },
        addStores: (state, action) => {
            state.stores = [action.payload, ...state.stores];
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state
            state.error = action.payload;
        },
    },
});

// Create a new store
export const createStore = (storeData) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:8080/stores", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(storeData),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addStore(data)); 
            } else {
                if(response.status === 401) dispatch(resetAdmin());
                dispatch(setError(data.error || "Failed to create store"));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

// Get stores by page and size
export const getStoresByPage = (page, size) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            if (page === undefined || page === null) {
                page = 0;
            }
            if (size === undefined || size === null) {
                size = 10;
            }

            const response = await fetch(`http://localhost:8080/stores?page=${page}&size=${size}`, {
                method: "GET",
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setStores(data.stores));
            } else {
                if(response.status === 401) dispatch(resetAdmin());
                dispatch(setError(data.error || "Failed to fetch stores"));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const { setStores, addStores, setLoading, setError, addStore } = storesSlice.actions;
export default storesSlice.reducer;