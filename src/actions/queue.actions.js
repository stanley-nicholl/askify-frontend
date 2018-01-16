
import { FETCH_QUEUE_SUCCESS } from '../actions'

export function fetchQueue(token) {
  return async (dispatch) => {

    const res = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const json = await res.json()

    dispatch({
      type: FETCH_QUEUE_SUCCESS,
      payload: json
    })
  }
}


export function postQuestion() {

}

export function postAnswer() {

}

export function updateQuestion() {

}

export function updateAnswer() {

}