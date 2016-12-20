import React, { Component } from 'react';
import { Label, Modal, Form, Button, Image } from 'semantic-ui-react';

export default class IdLabel extends Component {
  state = {
    open: false,
    inputVal: '',
  }

  closeModel = () => {
    this.setState({ open: false })
  }

  openModel = () => {
    this.setState({ open: true })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submitForm = (e) => {
    const { id, submitAction } = this.props;
    const { inputVal } = this.state;
    e.preventDefault();
    const idObj = {
      id: id,
      value: inputVal,
    };
    submitAction(idObj);
    this.setState({ inputVal: '', open: false });
  }

  render() {
    const { content, url, id } = this.props;
    const { open, inputVal } = this.state;
    return (
      <div>
        <Label size="small" as="a" onClick={this.openModel}>Add {content}</Label>
        <Modal open={open} onClose={this.closeModel}>
          <Modal.Header>Add {content}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={url} />
            <Modal.Description>
              <Form onSubmit={this.submitForm}>
                <Form.Input label={content} name="inputVal" value={inputVal} onChange={this.handleChange} />
                <Button>Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
