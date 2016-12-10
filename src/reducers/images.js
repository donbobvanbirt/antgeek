export default function images(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_ALL_IMAGES':
      // console.log('action.payload:', action.payload);
      return action.payload;
    case 'UPLOAD_SUCCESS':
      // const newState = state.push(action.payload);
      return [action.payload, ...state];
    default:
      return state;
  }
}
