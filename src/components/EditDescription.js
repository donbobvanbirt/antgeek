import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, Image, Table } from 'semantic-ui-react';

export default class EditImage extends Component {
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
    const { url, genus, species, commonName, description, tags } = this.props;
    const { open } = this.state;

    // const tagList = (
    //   <Table basic="very" celled collapsing>
    //     <Table.Header>
    //       <Table.Row>
    //         <Table.HeaderCell>Remove Tags:</Table.HeaderCell>
    //         {/* <Table.HeaderCell></Table.HeaderCell> */}
    //       </Table.Row>
    //     </Table.Header>
    //     <Table.Body>
    //       {tags.map((tag, i) => {
    //         if (tag) {
    //           return (
    //             <Table.Row key={i}>
    //               <Table.Cell singleLine>{tag}</Table.Cell>
    //               <Table.Cell singleLine><Button size="mini" color="red"><Icon name="remove" /></Button></Table.Cell>
    //             </Table.Row>
    //           );
    //         }
    //       })}
    //     </Table.Body>
    //   </Table>
    // );


    return (
      <div className="inline">
        <Button size="mini" color="black" onClick={this.openModel}><Icon name="edit" /> Edit Description</Button>
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
