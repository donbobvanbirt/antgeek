export default function currentImage(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_CURRENT_IMAGE':
      console.log('action.payload:', action.payload);
      return action.payload;
    case 'ADDED_COMMENT':
    case 'ADDED_TAGS':
    case 'ADDED_LIKE':
    case 'REMOVED_LIKE':
      return [action.payload];
    default:
      return state;
  }
}
