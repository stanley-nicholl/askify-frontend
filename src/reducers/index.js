import { combineReducers } from 'redux'
import {
  FETCH_QUEUE_SUCCESS,
  FETCH_ARCHIVE_SUCCESS,
  SIGN_UP_SUCCESS,
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_USER_SUCCESS,
  POST_QUESTION
} from '../actions'

// initial state for queue and archive arrays
const INITIAL_STATE = []

// initial state for user
const INITIAL_USER_STATE = {
  userToken : null,
  userId : null,
  fname : null,
  email: null,
  cohort : null,
  inQueue : false,
  order : 0
}

// Queue reducer
function queue(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      return [...action.payload]

    // these actions need to be implemented
    case POST_QUESTION:
      return [...action.payload]
    // case UPDATE_QUESTION:
    // case POST_ANSWER:
    // case UPDATE_ANSWER:
    default:
      return state
  }
}

// Archive reducer
function archive(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ARCHIVE_SUCCESS:
    return [...action.payload]
    default:
      return state
  }
}

// User reducer
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
