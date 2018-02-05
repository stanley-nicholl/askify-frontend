import {
  FETCH_USER_SUCCESS,
  LOGGED_OUT_SUCCESS,
  LOGGED_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  UPDATE_QUEUE_POSITION
} from "./index";


export function fetchUser() {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
    console.log(token);
    const header = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/user`, {
      headers: header,
      method: 'GET'
    })

    const json = await res.json()
    console.log('test3');

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: json
    })
  }
}

export function signIn(payload) {
  return async (dispatch) => {
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/auth/login`, {
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
    const newUser = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const user = await newUser.json()
    window.localStorage.setItem('askifyToken', user.token)

    window.localStorage.setItem('askifyToken', user.token)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: user
    })
  }
}

export function logUserOut() {
  return async (dispatch) => {

    window.localStorage.removeItem('askifyToken')

    dispatch({
      type: LOGGED_OUT_SUCCESS
    })
  }
}

export function updateQueuePosition(user, queue) {
  return async (dispatch) => {
    const position = queue.findIndex((item => {
      return item.userid === user.id
    }))

    dispatch({
      type: UPDATE_QUEUE_POSITION,
      payload: position + 1
    })
  }
}
