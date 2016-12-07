import { combineReducers } from 'redux';

import images from './images';
import currentImage from './currentImage';
import results from './results';

export default combineReducers({
  images,
  currentImage,
  results,
});
