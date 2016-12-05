import React, { Component } from 'react';

export default class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      file: '',
      imagePreviewUrl: '',
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onFileSelect = this._onFileSelect.bind(this);
  }

  _onFileSelect(e) {
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

  _onSubmit(e) {
    e.preventDefault();
    const { file } = this.state;
    this.props.submitFile(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <input type="file" onChange={this._onFileSelect} required />
          <button>Upload</button>
        </form>
        { imagePreviewUrl && <img id="demoimg" alt="demo" src={imagePreviewUrl} />}
      </div>
    );
  }
}
