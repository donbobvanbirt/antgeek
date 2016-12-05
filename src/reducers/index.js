import { combineReducers } from 'redux';

import images from './images';
import currentImage from './currentImage';

export default combineReducers({
  images,
  currentImage,
});
