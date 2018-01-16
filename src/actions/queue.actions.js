
import {
  FETCH_QUEUE_SUCCESS,
  POST_QUESTION
} from '../actions'

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


export function postQuestion(payload, token) {
  return async (dispatch) => {

    const res = await fetch(`https://askify-api.herokuapp.com/api/questions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const json = await res.json()

    dispatch({
      type: POST_QUESTION,
      payload: json
    })
  }
}

export function postAnswer() {

}

export function updateQuestion() {

}

export function updateAnswer() {

}
