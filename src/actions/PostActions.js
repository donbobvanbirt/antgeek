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

export function uploadSuccess(image) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: image,
  };
}
