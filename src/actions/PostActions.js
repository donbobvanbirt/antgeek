import axios from 'axios';

export function upload(file, details) {
  return (dispatch) => {
    // console.log(file);
    const data = new FormData();
    data.append('myfile', file);
    // console.log('data:', data);
    const { description, title, tags } = details;
    // console.log('data:', data);
    axios.post(`/api/images?description=${description}&title=${title}&tags=${tags}`, data)
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

export function getCurrentImage(id) {
  return (dispatch) => {
    axios.get(`/api/images/${id}`)
      .then(res => res.data)
      .then(data2 => dispatch(gotCurrentImage(data2)))
      .catch(console.error);
  };
}

export function postComment(id, comment) {
  return (dispatch) => {
    // console.log('')
    axios.post(`/api/images/comment/${id}`, comment)
      .then((res) => {
        dispatch(addedComment(res.data));
      })
      .catch(console.error);
  };
}

export function addTags(id, tags) {
  return (dispatch) => {
    axios.post(`/api/images/tags/${id}`, tags)
      .then((res) => {
        dispatch(addedTags(res.data));
      })
      .catch(console.error);
  };
}

export function getSearchResults(query) {
  return (dispatch) => {
    axios.get(`/api/images/search/${query}`)
    .then((res) => {
      dispatch(gotSearchResults(res.data));
    })
    .catch(console.error);
  }
}

export function uploadSuccess(image) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: image,
  };
}

export function addedComment(data) {
  return {
    type: 'ADDED_COMMENT',
    payload: data,
  };
}

export function getAllImages(images) {
  return {
    type: 'GOT_ALL_IMAGES',
    payload: images,
  };
}

export function gotCurrentImage(image) {
  return {
    type: 'GOT_CURRENT_IMAGE',
    payload: image,
  };
}

export function addedTags(data) {
  return {
    type: 'ADDED_TAGS',
    payload: data,
  };
}

export function gotSearchResults(data) {
  return {
    type: 'GOT_SEARCH_RESULTS',
    payload: data,
  };
}
