import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Table, Image } from 'semantic-ui-react';

export default class RemoveTags extends Component {
  state = {
    open: false,
  }

  // submitChanges = () => {
  //   const { description, genus, species, commonName } = this.state;
  //   const editObj = {
  //     genus: genus || this.props.genus,
  //     species: species || this.props.species,
  //     commonName: commonName || this.props.commonName,
  //     description: description || this.props.description,
  //   };
  //   this.props.submit(editObj);
  //   this.setState({
  //     open: false,
  //     genus: '',
  //     species: '',
  //     commonName: '',
  //     description: '',
  //   });
  // }

  closeModel = () => {
    this.setState({ open: false });
  }

  openModel = () => {
    this.setState({ open: true });
  }

  // _onType = (e) => {
  //   const { value, name } = e.target;
  //   this.setState({ [name]: value });
  // }

  render() {
    const { tags, url } = this.props;
    const { open } = this.state;

    // const tagList = tags.map((tag, i) => {
    //   if (tag) {
    //     return (
    //       <Table.Row key={i}>
    //         <Table.Cell singleLine>{tag}</Table.Cell>
    //         <Table.Cell singleLine><Button size="mini" color="red"><Icon name="remove" /></Button></Table.Cell>
    //       </Table.Row>
    //     );
    //   }
    // });

    const tagList = (
      <Table basic="very" celled collapsing>
        <Table.Body>
          {tags.map((tag, i) => {
            if (tag) {
              return (
                <Table.Row key={i}>
                  <Table.Cell singleLine>{tag}</Table.Cell>
                  <Table.Cell singleLine><Button size="mini" color="red"><Icon name="remove" /></Button></Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    );

    return (
      <div className="inline">
        <Button size="mini" color="red" onClick={this.openModel}>Remove Tags</Button>
        <Modal open={open} onClose={this.closeModel}>
          <Header content="Remove Tags" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              {tagList}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
