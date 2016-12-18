import { combineReducers } from 'redux';

import images from './images';
import currentImage from './currentImage';
import results from './results';
import auth from './auth';
import userImages from './userImages';
import userInfo from './userInfo';

export default combineReducers({
  images,
  currentImage,
  results,
  auth,
  userImages,
  userInfo,
});
