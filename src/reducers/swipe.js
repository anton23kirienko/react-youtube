const defaultState = {
  sliderLeft: 0,
  pageMultiplier: 0
}

export default (state = defaultState, action) => {
  if (action.type === 'SWIPE_PAGINATION') {
    return Object.assign({}, state, {
      pageMultiplier: action.pageMultiplier
    });
  }

  return state;
}
