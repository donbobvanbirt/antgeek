export default function results(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
}
