import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      file: '',
      imagePreviewUrl: '',
      open: false,
    };
  }

  _onFileSelect = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  _onSubmit = (e) => {
    e.preventDefault();
    const { file, description, tags, title } = this.state;
    let tagList = [];
    const detailObj = {
      description: description || '',
      title: title || '',
      tags: tags || '',
    };
    console.log('detailObj:', detailObj);
    this.props.submitFile(file, detailObj);
    this.close();
  }

  show = () => () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { imagePreviewUrl, open } = this.state;
    return (
      <div>


        <Button onClick={this.show('large')}>Share Image</Button>

        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Header>
            Upload Image
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input type="file" label="Image File" onChange={this._onFileSelect} required />
              <Form.Input type="text" label="Title" name="title" onChange={this._onType} />
              <Form.Input type="text" label="Tags - separated by spaces" name="tags" placeholder="If you know the scientific or common names enter them here" onChange={this._onType} />
              <Form.TextArea label="Description" name="description" placeholder="Description" rows="3" onChange={this._onType} />
            </Form>
            {/* <form onSubmit={this._onSubmit}>
              <input type="file" onChange={this._onFileSelect} required />
              <button>Submit</button>
            </form> */}
            { imagePreviewUrl && <img id="demoimg" alt="demo" src={imagePreviewUrl} />}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this._onSubmit} primary>Submit</Button>
            <Button onClick={this.close} default>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
