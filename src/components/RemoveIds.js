import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Table, Image } from 'semantic-ui-react';

const RemoveIds = (props) => {
  const { genus, species, commonName, url, submit, open, setCurrentModel } = props;

  const genusButton = genus ? <Button icon="remove" color="red" onClick={() => submit('genus')} /> : '';
  const speciesButton = species ? <Button icon="remove" color="red" onClick={() => submit('species')} /> : '';
  const comNameButton = commonName ? <Button icon="remove" color="red" onClick={() => submit('commonName')} /> : '';

  return (
    <div className="inline">
      {/* <Button size="mini" color="red" onClick={this.openModel}>Remove IDs</Button> */}
      <span className="pointer" onClick={() => setCurrentModel('removeIdsModel')}><i><Icon name="remove" />Remove IDs</i></span>
      <Modal open={open} onClose={() => setCurrentModel(null)}>
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
          <Button onClick={() => setCurrentModel(null)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default RemoveIds;
