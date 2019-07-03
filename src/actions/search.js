import { fetchVideoTitle } from './../utils/fetchVideoTitle';

const searchRequest = () => {
  return { type: 'SEARCH_PENDING' }
}

const searchSuccess = res => {
  return {
    type: 'SEARCH_SUCCESS',
    payload: res
  }
}

const searchError = error => {
  return {
    type: 'SEARCH_ERROR',
    error
  }
}

const searchClear = () => {
  return { type: 'SEARCH_CLEAR' }
}

// search initial set of videos
export const searchInitially = title => (
  dispatch => {
    dispatch(searchClear());
    dispatch(searchRequest());

    fetchVideoTitle(title)
      .then(res => dispatch(searchSuccess(res)))
      .catch(err => dispatch(searchError(err)));
  }
);

// search additional set of videos (youtube API token is required)
export const searchAdditionally = (title, token) => dispatch => {
  dispatch(searchRequest());

  fetchVideoTitle(title, token)
    .then(res => dispatch(searchSuccess(res)))
    .catch(err => dispatch(searchError(err)));
}
