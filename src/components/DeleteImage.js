import React, { Component } from 'react';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';

const DeleteImage = (props) => {
  const { deleteImage, setCurrentModel, open } = props;
  return (
    <div className="inline">
      <Button color="red" size="mini" onClick={() => setCurrentModel('deleteImageModal')}><Icon name="remove" />Delete Image</Button>
      <Modal basic open={open} onClose={() => setCurrentModel(null)}>
        <Header icon="warning" content="Delete this image?" />
        <Modal.Content>
          <p>This image and its content cannot be recovered once deleted!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setCurrentModel(null)} color="green" floated="left" inverted><Icon name="checkmark" /> Cancel</Button>
          <Button onClick={deleteImage} color="red" floated="left" basic inverted><Icon name="remove" /> Delete</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default DeleteImage;
