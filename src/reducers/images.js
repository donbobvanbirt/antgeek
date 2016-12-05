export default function images(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_ALL_IMAGES':
      console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
