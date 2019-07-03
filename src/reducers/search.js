const defaultState = {
  searchStatus: '',
  error: '',
  title: '',
  data: [],
  nextPageToken: ''
}

export default (state = defaultState, action) => {
  if (action.type === 'SEARCH_PENDING') {
    return Object.assign({}, state, {
      searchStatus: 'pending'
    });
  }
  else if(action.type === 'SEARCH_SUCCESS') {
    return Object.assign({}, state, {
      searchStatus: 'success',
      data: [...state.data, ...action.payload.data],
      nextPageToken: action.payload.token,
      title: action.payload.title
    });
  }
  else if(action.type === 'SEARCH_ERROR') {
    return Object.assign({}, state, {
      searchStatus: 'error',
      error: action.error
    });
  }
  else if(action.type === 'SEARCH_CLEAR') {
    return defaultState;
  }

  return state;
}
