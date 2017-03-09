import { combineReducers } from 'redux'
import envReducer from './envReducer'
import bubbleReducer from './bubbleReducer'

const bubbleApp = combineReducers({
    envReducer,
    bubbleReducer
})

export default bubbleApp
