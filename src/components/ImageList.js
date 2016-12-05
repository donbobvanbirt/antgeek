import React from 'react';

const ImageList = (props) => {
  let picList = '';
  if (props.images) {
    picList = props.images.map((pic) => {
      const { url, _id, name } = pic;
      return (
        <img className="listimg" src={url} alt={name} key={_id} />
      );
    });
  }
  return (
    <div>
      {picList}
    </div>
  );
}

export default ImageList;
