import axios from 'axios';
import { firebaseAuth } from '../firebase';

export function upload(file, details) {
  return (dispatch) => {
    // console.log(file);
    const data = new FormData();
    data.append('myfile', file);
    // console.log('data:', data);
    const { description, tags, genus, species, commonName } = details;
    // const token = firebaseAuth.currentUser.getToken();
    // console.log('token:', token);
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.post(`/api/images?description=${description}&tags=${tags}&genus=${genus}&species=${species}&commonName=${commonName}`, data, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
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
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.post(`/api/images/comment/${id}`, comment, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        // console.log('res:', res);
        dispatch(addedComment(res.data));
      })
      .catch(console.error);
  };
}

export function updateImage(id, obj) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.put(`/api/images/${id}`, obj, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        // console.log('res:', res);
        dispatch(updatedImage(res.data));
      })
      .catch(console.error);
  };
}

export function removeImage(id) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        // console.log('token in actions:', token);
        return axios.put(`/api/images/delete/${id}`, null, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        getImages();
      })
      .catch(console.error);
  };
}

export function likePost(postId) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        // console.log('token in actions:', token);
        return axios.put(`/api/images/like/${postId}`, null, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        // console.log('res:', res);
        dispatch(addedLike(res.data));
      })
      .catch(console.error);
  };
}

export function unlikePost(postId) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        // console.log('token in actions:', token);
        return axios.put(`/api/images/unlike/${postId}`, null, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        console.log('res:', res);
        dispatch(removedLike(res.data));
      })
      .catch(console.error);
  };
}

export function addTags(id, tags) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.post(`/api/images/tags/${id}`, tags, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        dispatch(addedTags(res.data));
      })
      .catch(console.error);
  };
}

export function removeTag(id, tag) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.put(`/api/images/untag/${id}`, tag, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        dispatch(removedTag(res.data));
      })
      .catch(console.error);
  };
}

export function addId(imageId, newId) {
  return (dispatch) => {
    firebaseAuth.currentUser.getToken()
      .then((token) => {
        return axios.post(`/api/images/id/${imageId}`, newId, {
          headers: {
            'x-auth-token': token,
          },
        });
      })
      .then((res) => {
        dispatch(addedId(res.data));
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

export function getImagesByUser(id) {
  return (dispatch) => {
    axios.get(`/api/images/user/${id}`)
    .then((res) => {
      dispatch(gotImagesByUser(res.data));
    })
    .catch(console.error);
  };
}

export function getLikedImages(id) {
  return (dispatch) => {
    axios.get(`/api/images/liked/${id}`)
    .then((res) => {
      dispatch(gotLikedImages(res.data));
    })
    .catch(console.error);
  };
}

export function getUserInfo(id) {
  return (dispatch) => {
    axios.get(`/api/users/${id}`)
    .then((res) => {
      dispatch(gotUserInfo(res.data));
    })
    .catch(console.error);
  };
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

export function updatedImage(data) {
  return {
    type: 'UPDATED_IMAGE',
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

export function removedTag(data) {
  return {
    type: 'REMOVED_TAG',
    payload: data,
  };
}

export function addedId(data) {
  return {
    type: 'ADDED_ID',
    payload: data,
  };
}

export function addedLike(data) {
  // console.log('data:', data);
  return {
    type: 'ADDED_LIKE',
    payload: data,
  };
}

export function removedLike(data) {
  console.log('data:', data);
  return {
    type: 'REMOVED_LIKE',
    payload: data,
  };
}

export function gotSearchResults(data) {
  return {
    type: 'GOT_SEARCH_RESULTS',
    payload: data,
  };
}

export function gotImagesByUser(data) {
  return {
    type: 'GOT_IMAGES_BY_USER',
    payload: data,
  };
}

export function gotLikedImages(data) {
  return {
    type: 'GOT_LIKED_IMAGES',
    payload: data,
  };
}

export function gotUserInfo(data) {
  return {
    type: 'GOT_USER_INFO',
    payload: data,
  };
}
