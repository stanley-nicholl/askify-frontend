import {
  FETCH_ARCHIVE_SUCCESS
} from '../actions'

export function fetchArchive() {
  return async (dispatch) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIwLCJyb2wiOmZhbHNlLCJleHAiOjE1MTc2OTEyMTd9.BI_0cWLJKA1YYwSywJLFQqgmYtQjqUepcSuFeyVmG8I'
    const res = await fetch(`${process.env.REACT_APP_DASHDASH_API_URL}/api/archive`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()

    dispatch({
      type: FETCH_ARCHIVE_SUCCESS,
      payload: json
    })
  }
}
