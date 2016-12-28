import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, Image, Table } from 'semantic-ui-react';

export default class EditImage extends Component {
  state = {
    description: '',
  }

  submitChanges = () => {
    const { description, genus, species, commonName } = this.state;
    const editObj = {
      description: description || this.props.description,
    };
    this.props.submit(editObj);
    this.setState({
      description: '',
    });
  }

  closeModel = () => {
    this.setState({ open: false });
  }

  openModel = () => {
    this.setState({ open: true });
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { url, genus, species, commonName, description, tags, setCurrentModel, open } = this.props;

    return (
      <div className="inline">
        <span className="pointer" onClick={() => setCurrentModel('editDescription')}><i><Icon name="edit" />Edit Description</i></span>
        <Modal open={open} onClose={() => setCurrentModel(null)}>
          <Header content="Edit Description" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              <Form>
                <Form.TextArea defaultValue={description} label="Description" name="description" placeholder="Add Description" rows="3" onChange={this._onType} />
              </Form>
              <br />
              <Button onClick={() => setCurrentModel(null)} floated="left">Cancel</Button>
              <Button onClick={this.submitChanges} color="green" floated="left" basic>Save Changes</Button>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
