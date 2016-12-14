export default function results(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_IMAGES_BY_USER':
      return action.payload;
    default:
      return state;
  }
}
