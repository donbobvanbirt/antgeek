import { combineReducers } from 'redux';

import images from './images';
import currentImage from './currentImage';
import results from './results';
import auth from './auth';

export default combineReducers({
  images,
  currentImage,
  results,
  auth,
});
