import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS,
} from "../../types"

export default (state, action) => {
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case SET_LOADING:
            return {
            // change to Object.assign()?
            ...state,
            loading: true
        }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        default:
            return state;
    }
}