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
    const { file, description, tags, genus, species, commonName } = this.state;
    if (!file) { return; }
    let tagList = [];
    const detailObj = {
      description: description || '',
      genus: genus || '',
      species: species || '',
      commonName: commonName || '',
      tags: tags || '',
    };
    // console.log('detailObj:', detailObj);
    this.props.submitFile(file, detailObj);
    // this.close();
    this.setState({
      file: '',
      description: '',
      tags: '',
      open: false,
    })
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
              <Form.Input type="text" label="Genus" name="genus" onChange={this._onType} placeholder="Leave blank if you don't know" />
              <Form.Input type="text" label="Species" name="species" onChange={this._onType} placeholder="Leave blank if you don't know" />
              <Form.Input type="text" label="Common Name" name="commonName" onChange={this._onType} placeholder="Leave blank if you don't know" />
              <Form.Input type="text" label="Tags - separated by commas" name="tags" placeholder="Add any other info here" onChange={this._onType} />
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
