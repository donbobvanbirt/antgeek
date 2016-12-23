import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, Image } from 'semantic-ui-react';

export default class DeleteImage extends Component {
  state = {
    open: false,
    genus: '',
    species: '',
    commonName: '',
    description: '',
  }

  submitChanges = () => {
    const { description, genus, species, commonName } = this.state;
    const editObj = {
      genus: genus || this.props.genus,
      species: species || this.props.species,
      commonName: commonName || this.props.commonName,
      description: description || this.props.description,
    };
    this.props.submit(editObj);
    this.setState({
      open: false,
      genus: '',
      species: '',
      commonName: '',
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
    const { url, genus, species, commonName, description } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Button size="mini" color="green" onClick={this.openModel}><Icon name="edit" /></Button>
        <Modal open={open} onClose={this.closeModel}>
          <Header content="Edit Image Details" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              <Form>
                <Form.Input type="text" defaultValue={genus} label="Genus" name="genus" onChange={this._onType} placeholder="Leave blank if you don't know" />
                <Form.Input type="text" defaultValue={species} label="Species" name="species" onChange={this._onType} placeholder="Leave blank if you don't know" />
                <Form.Input type="text" defaultValue={commonName} label="Common Name" name="commonName" onChange={this._onType} placeholder="Leave blank if you don't know" />
                <Form.TextArea defaultValue={description} label="Description" name="description" placeholder="Description" rows="3" onChange={this._onType} />
              </Form>
              <br />
              <Button onClick={this.closeModel} floated="left">Cancel</Button>
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
