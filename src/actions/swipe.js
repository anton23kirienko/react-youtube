export const swipePagination = pageMultiplier => dispatch => {
  dispatch({
    type: 'SWIPE_PAGINATION',
    pageMultiplier
  });
}
