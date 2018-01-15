import { combineReducers } from 'redux'
import {
  FETCH_QUEUE_SUCCESS,
  FETCH_ARCHIVE_SUCCESS,
  SIGN_UP_SUCCESS,
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_USER_SUCCESS
} from '../actions'

const INITIAL_STATE = []
const INITIAL_USER_STATE = {
  userToken : null,
  userId : null,
  fname : null,
  email: null,
  cohort : null,
}

function queue(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_QUEUE_SUCCESS: 
      return [...action.payload]
    default: 
      return state
  }
}

function archive(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ARCHIVE_SUCCESS: 
    return [...action.payload]
    default: 
      return state
  }
}

function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
    case LOGGED_IN_SUCCESS: 
    case SIGN_UP_SUCCESS:
      return action.payload
    case LOGGED_OUT_SUCCESS:
      return INITIAL_USER_STATE
    default:
      return state
  }
}

export default combineReducers({
  queue,
  archive,
  user
})
