import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, Image, Table } from 'semantic-ui-react';

export default class EditImage extends Component {
  state = {
    open: false,
    description: '',
  }

  submitChanges = () => {
    const { description, genus, species, commonName } = this.state;
    const editObj = {
      description: description || this.props.description,
    };
    this.props.submit(editObj);
    this.setState({
      open: false,
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
    const { url, genus, species, commonName, description, tags } = this.props;
    const { open } = this.state;

    return (
      <div className="inline">
        {/* <Button size="mini" color="black" onClick={this.openModel}><Icon name="edit" /> Edit Description</Button> */}
        <span className="pointer" onClick={this.openModel}><i><Icon name="edit" />Edit Description</i></span>
        <Modal open={open} onClose={this.closeModel}>
          <Header content="Edit Description" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              {/* {tagList} */}
              <Form>
                {/* <Table basic="very" celled collapsing>
                  <Table.Body>
                    {tagList}
                  </Table.Body>
                </Table> */}
                {/* <Form.Input type="text" defaultValue={genus} label="Genus" name="genus" onChange={this._onType} placeholder="Add Genus" />
                <Form.Input type="text" defaultValue={species} label="Species" name="species" onChange={this._onType} placeholder="Add Species" />
                <Form.Input type="text" defaultValue={commonName} label="Common Name" name="commonName" onChange={this._onType} placeholder="Add Common Name" /> */}
                <Form.TextArea defaultValue={description} label="Description" name="description" placeholder="Add Description" rows="3" onChange={this._onType} />
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
