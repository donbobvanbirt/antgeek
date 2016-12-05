import axios from 'axios';

export function upload(file) {
  return (dispatch) => {
    console.log(file);
    const data = new FormData();
    data.append('myfile', file);
    console.log('data:', data);
    axios.post('/api/images', data)
      .then((res) => {
        const image = res.data;
        dispatch(uploadSuccess(image));
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
}

export function getImages() {
  return (dispatch) => {
    axios.get('/api/images/')
      .then(res => res.data)
      .then(data2 => dispatch(getAllImages(data2)))
      .catch(console.error);
  };
}

export function uploadSuccess(image) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: image,
  };
}

export function getAllImages(images) {
  console.log('images in actions:', images);
  return {
    type: 'GOT_ALL_IMAGES',
    payload: images,
  };
}
