export default function userInfo(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'GOT_USER_INFO':
      return action.payload;
    default:
      return state;
  }
}
