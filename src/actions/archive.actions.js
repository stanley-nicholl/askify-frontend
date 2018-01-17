import {
  FETCH_ARCHIVE_SUCCESS
} from '../actions'

export function fetchArchive(token) {
  return async (dispatch) => {
    const res = await fetch(`https://askify-api.herokuapp.com/api/archive`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const json = await res.json()

    dispatch({
      type: FETCH_ARCHIVE_SUCCESS,
      payload: json
    })
  }
}
