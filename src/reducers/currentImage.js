export default function currentImage(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_CURRENT_IMAGE':
      console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
