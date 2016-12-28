import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Table, Image } from 'semantic-ui-react';

const RemoveTags = (props) => {
  const { tags, url, submit, open, setCurrentModel } = props;

  const tagList = (
    <Table basic="very" celled collapsing>
      <Table.Body>
        {tags.map((tag, i) => (
          <Table.Row key={i}>
            <Table.Cell singleLine>{tag}</Table.Cell>
            <Table.Cell singleLine>
              <Button icon="remove" color="red" onClick={() => submit(tag)} />
            </Table.Cell>
          </Table.Row>
        )
      )}
      </Table.Body>
    </Table>
  );

  return (
    <div className="inline">
      <span className="pointer" onClick={() => setCurrentModel('removeTagsModel')}><i><Icon name="remove" />Remove Tags</i></span>
      <Modal open={open} onClose={() => setCurrentModel(null)}>
        <Header content="Remove Tags" />
        <Modal.Content image>
          <Image wrapped size="medium" src={url} />
          <Modal.Description>
            {tagList}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setCurrentModel(null)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default RemoveTags;
