
import { FETCH_QUEUE_SUCCESS } from '../actions'

export function fetchQueue() {
  return async (dispatch) => {
    const res = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'cors': true
      }
    })

    const json = await res.JSON()

    return {
      type: FETCH_QUEUE_SUCCESS,
      payload: json
    }
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