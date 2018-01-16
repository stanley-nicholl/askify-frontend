import {
  FETCH_QUEUE_SUCCESS,
  POST_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUEUE_POSITION
} from '../actions'

import { updateQueuePosition } from './user.actions'

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
    const res = await fetch(`https://askify-api.herokuapp.com/api/questions/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    dispatch(fetchQueue(token))
    dispatch(updateQueuePosition(getUserId(token), getQueueData(token)))
  }
}

export function postAnswer(qid, fname, cohort, answer, token) {
  return async (dispatch) => {
    const res = await fetch(`https://askify-api.herokuapp.com/api/questions/${qid}/answers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        answer,
        fname,
        cohort
      })
    })
  }
}

export function updateQuestion(id, question, token) {
  return async (dispatch) => {
    const res = await fetch(`https://askify-api.herokuapp.com/api/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({question})
    })

    dispatch(fetchQueue(token))
  }
}

async function getUserId(token) {
  const header = {
    'Authorization': `Bearer ${token}`,
  }
  const res = await fetch(`https://askify-api.herokuapp.com/api/user`, {
    headers: header
  })
  const user = await res.json()

  return user.id
}

async function getQueueData(token) {
  const res = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  const json = await res.json()
  return json
}