import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Table, Image } from 'semantic-ui-react';

export default class RemoveIds extends Component {
  state = {
    open: false,
  }

  closeModel = () => {
    this.setState({ open: false });
  }

  openModel = () => {
    this.setState({ open: true });
  }

  render() {
    const { genus, species, commonName, url, submit } = this.props;
    const { open } = this.state;

    const genusButton = genus ? <Button icon="remove" color="red" onClick={() => submit('genus')} /> : '';
    const speciesButton = species ? <Button icon="remove" color="red" onClick={() => submit('species')} /> : '';
    const comNameButton = commonName ? <Button icon="remove" color="red" onClick={() => submit('commonName')} /> : '';

    return (
      <div className="inline">
        <Button size="mini" color="red" onClick={this.openModel}>Remove IDs</Button>
        <Modal open={open} onClose={this.closeModel}>
          <Header content="Remove IDs" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              <Table basic="very" celled collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell singleLine>Genus:</Table.Cell>
                    <Table.Cell singleLine>{genus}</Table.Cell>
                    <Table.Cell singleLine>
                      {genusButton}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>Species:</Table.Cell>
                    <Table.Cell singleLine>{species}</Table.Cell>
                    <Table.Cell singleLine>
                      {speciesButton}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>Common Name:</Table.Cell>
                    <Table.Cell singleLine>{commonName}</Table.Cell>
                    <Table.Cell singleLine>
                      {comNameButton}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModel}>Close</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
