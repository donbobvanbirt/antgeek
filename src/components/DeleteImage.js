import React, { Component } from 'react';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';

export default class DeleteImage extends Component {
  state = { open: false }

  closeModel = () => {
    this.setState({ open: false })
  }

  openModel = () => {
    this.setState({ open: true })
  }

  render() {
    const { deleteImage } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button size="mini" color="red" onClick={this.openModel}><Icon name="remove" /></Button>
        <Modal basic open={open} onClose={this.closeModel}>
          <Header icon="warning" content="Delete this image?" />
          <Modal.Content>
            <p>This image and its content cannot be recovered once deleted!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModel} color="green" floated="left" inverted><Icon name="checkmark" /> Cancel</Button>
            <Button onClick={deleteImage} color="red" floated="left" basic inverted><Icon name="remove" /> Delete</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
