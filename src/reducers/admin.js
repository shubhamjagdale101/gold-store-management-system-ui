import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoggedIn: false,
        name: "",
        email: "",
        createdAt : "",
        updatedAt : "",
        isLoading: false,
        error: null,
    },
    reducers: {
        setAdmin: (state, action) => {
            console.log("action setAdmin", action.payload)
            state.email = action.payload?.data?.email;
            state.isLoggedIn = true;
            state.name = action.payload?.data?.name;
            state.createdAt = action.payload?.data?.createdAt;
            state.updatedAt = action.payload?.data?.updatedAt;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            console.log("error", action.payload)
            state.error = action.payload;
        },
        resetAdmin: (state) => {
            state.isLoggedIn = false;
            state.name = "";
            state.email = "";
            state.createdAt = "";
            state.updatedAt = "";
            state.isLoading = false;
            state.error = null;
        }
    },
})

export const fetchAdmin = (email, password) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setAdmin(data));
            } else {
                dispatch(resetAdmin());
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export const logoutAdmin = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                dispatch(resetAdmin());
            } else {
                const data = await response.json();
                dispatch(setError(data.message));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export const registerAdmin = (name, email, password) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                dispatch(setAdmin(data));
            } else {
                console.log(data)
                dispatch(setError(data.error));
            }
        } catch (error) {
            console.log(error)
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export const { setAdmin, setLoading, setError, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;