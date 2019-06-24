import {
    SET_ALERT,
    REMOVE_ALERT,
} from "../../types"

export default (state, action) => {
    switch(action.type) {
        case SET_ALERT:
            //type is discarded, now the object payload becomes entire state
            return action.payload
        case REMOVE_ALERT:
            return null
        default:
            return state;
    }
}