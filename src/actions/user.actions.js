import {
  FETCH_USER_SUCCESS,
  LOGGED_OUT_SUCCESS,
  LOGGED_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  UPDATE_QUEUE_POSITION
} from "./index";

export function fetchUser(token) {
  return async (dispatch) => {

    const header = {
      'Authorization': `Bearer ${token}`,

    }
    const res = await fetch(`https://askify-api.herokuapp.com/api/user`, {
      headers: header
    })
    const json = await res.json()

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: json
    })
  }
}

export function signIn(payload) {
  return async (dispatch) => {
    const res = await fetch(`https://askify-api.herokuapp.com/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const user = await res.json()

    window.localStorage.setItem('askifyToken', user.token)

    dispatch({
      type: LOGGED_IN_SUCCESS,
      payload: user
    })
  }
}

export function signUp(payload) {
  return async (dispatch) => {
    const newUser = await fetch(`https://askify-api.herokuapp.com/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const user = await newUser.json()

    window.localStorage.setItem('askifyToken', user.token)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: user
    })
  }
}

export function logUserOut() {
  return async (dispatch) => {

    dispatch({
      type: LOGGED_OUT_SUCCESS
    })
  }
}

export function updateQueuePosition(user, queue) {
  return async (dispatch) => {
    const position = queue.findIndex((item => {
      return  item.userid === user.id
    }))

    dispatch({
      type: UPDATE_QUEUE_POSITION,
      payload: position + 1
    })
  }
}
