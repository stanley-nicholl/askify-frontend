
import { FETCH_QUEUE_SUCCESS } from '../actions'

export function fetchQueue(token) {
  return async (dispatch) => {

    const res = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ZmFsc2UsImV4cCI6MTUxNjE0MzU3Nn0.c-NUZP_qx1ghM28uOMC9LPbcR0bx-3vez83-pAC04q4`,
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