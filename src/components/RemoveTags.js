import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Table, Image } from 'semantic-ui-react';

export default class RemoveTags extends Component {
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
    const { tags, url, submit } = this.props;
    const { open } = this.state;

    const tagList = (
      <Table basic="very" celled collapsing>
        <Table.Body>
          {tags.map((tag, i) => {
            if (tag) {
              return (
                <Table.Row key={i}>
                  <Table.Cell singleLine>{tag}</Table.Cell>
                  <Table.Cell singleLine>
                    <Button icon="remove" color="red" onClick={() => submit(tag)} />
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    );

    return (
      <div className="inline">
        {/* <Button size="mini" color="red" onClick={this.openModel}>Remove Tags</Button> */}
        <span className="pointer" onClick={this.openModel}><i><Icon name="remove" />Remove Tags</i></span>
        <Modal open={open} onClose={this.closeModel}>
          <Header content="Remove Tags" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              {tagList}
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
