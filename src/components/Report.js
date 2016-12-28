import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, Image, Radio } from 'semantic-ui-react';

export default class Report extends Component {

  check = (e) => {
    console.log('e.target.name:', e.target.name);
  }

  render() {
    const { url, submit, _onType, value, _onSelect, setCurrentModel, open } = this.props;

    return (
      <div className="inline">
        <span className="pointer" onClick={() => setCurrentModel('reportModel')}><i><Icon name="flag" /> Report image</i></span>
        <Modal open={open} onClose={() => setCurrentModel(null)}>
          <Header content="Report Image" />
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              <Form onSubmit={submit}>
                <Form.Group grouped>
                  <label>Select Reason(s):</label>
                  <Form.Field control={Radio} name="inappropriate" label="Inappropriate" value="inappropriate" checked={value === 'inappropriate'} onChange={_onSelect} />
                  <Form.Field control={Radio} name="offTopic" label="Off Topic" value="offTopic" checked={value === 'offTopic'} onChange={_onSelect} />
                  <Form.Field control={Radio} name="unauthorized" label="Unauthorized Use" value="unauthorized" checked={value === 'unauthorized'} onChange={_onSelect} />
                  <Form.Field control={Radio} name="other" label="Other" value="other" checked={value === 'other'} onChange={_onSelect} />
                </Form.Group>
                <Form.TextArea
                  label="Comments:"
                  name="reportComments"
                  placeholder="Please provide details..."
                  rows="3"
                  onChange={_onType}
                />
                <Button>Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setCurrentModel(null)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
