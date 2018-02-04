import {
  FETCH_ARCHIVE_SUCCESS
} from '../actions'

export function fetchArchive() {
  return async (dispatch) => {
    const token = localStorage.getItem('askifyToken')
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
