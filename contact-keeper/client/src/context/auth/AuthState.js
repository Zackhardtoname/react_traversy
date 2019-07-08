import React, { useReducer} from "react"
import axios from "axios"
import AuthContext from "./authContext"
import AuthReducer from "./authReducer"
import setAuthToken from "../../utils/setAuthToken"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../types"

const AuthState = props =>    {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get("/api/auth")
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            })
        }
    }

    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post("/api/auth", formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.msg
            })
        }
    }


    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post("/api/users", formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (e) {
            dispatch({
                type: REGISTER_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const logout = () => dispatch({type: LOGOUT})


    const clearErrors = () => dispatch({type: CLEAR_ERRORS})

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState