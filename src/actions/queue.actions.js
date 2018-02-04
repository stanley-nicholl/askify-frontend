import {
  FETCH_QUEUE_SUCCESS,
  POST_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUEUE_POSITION
} from '../actions'

import { updateQueuePosition } from './user.actions'

export function fetchQueue() {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/queue`, {
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

export function postQuestion(payload) {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/questions/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    dispatch(fetchQueue(token))

    const uid = await getUserId(token)
    const queue = await getQueueData(token)

    const position = queue.findIndex((item => {
      return item.userid === uid
    }))

    dispatch({
      type: UPDATE_QUEUE_POSITION,
      payload: position
    })
  }
}

export function postAnswer(qid, fname, cohort, answer) {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/questions/${qid}/answers`, {
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
    dispatch(fetchQueue(token))

    const uid = await getUserId(token)
    const queue = await getQueueData(token)

    dispatch(updateQueuePosition(uid, queue))
  }
}

export function updateQuestion(id, question) {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({question})
    })

    dispatch(fetchQueue(token))

    const uid = await getUserId(token)
    const queue = await getQueueData(token)

    dispatch(updateQueuePosition(uid, queue))
  }
}

async function getUserId() {
  const token = localStorage.getItem('askifyToken')
  const header = {
    'Authorization': `Bearer ${token}`,
  }
  const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/user`, {
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
