
import {
  FETCH_QUEUE_SUCCESS,
  POST_QUESTION
} from '../actions'

export function fetchQueue(token) {
  return async (dispatch) => {
    console.log('fetchqueeu')
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
    console.log('post question, payload:', payload)
    const res = await fetch(`https://askify-api.herokuapp.com/api/questions/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    dispatch(fetchQueue(token))
  }
}

export function postAnswer() {

}

export function updateQuestion() {

}

export function updateAnswer() {

}
