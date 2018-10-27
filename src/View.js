import React, {Component} from 'react';
import {Image} from 'cloudinary-react';
import {Cloudinary} from './cloudinary-sdk';
import './View.css';

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const folder = process.env.REACT_APP_FOLDER;
const tag = process.env.REACT_APP_TAG;

const cl = new Cloudinary(cloudName);

class Form extends Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.submit(e)}>
        <p>
          <label htmlFor="tag">Tag</label>
          <input ref="tag" id="tag" type="text" placeholder="browser_upload" defaultValue="browser_upload"/>
        </p>
        <p>
          <label htmlFor="folder">Folder</label>
          <input ref="folder" id="folder" type="text" placeholder="browser_upload" defaultValue="browser_upload"/>
        </p>
        <p>
          <label htmlFor="file">File</label>
          <input ref="file" id="file" type="file"/>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    )
  }
}

class View extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    cl.findByTag(tag)
      .then(data => {
        if (data && data.resources) {
          this.setState({data});
        } else {
          this.setState({data: {}});
        }
      })
      .catch(err => console.error(err));
  }

  submit(e) {
    e.preventDefault();
    const form = this.refs.form;

    if (!(form.refs.file.files && form.refs.file.files.length)) {
      return
    }
    const file = form.refs.file.files[0];

    cl.create(file, {
      uploadPreset,
      folder,
      tag
    })
  }

  render() {
    const {resources} = this.state.data;
    let list;

    if (Array.isArray(resources)) {
      list = <ul>
        {resources.map(item => <li key={item.public_id}>
          {item.public_id}
          <Image cloudName={cloudName} publicId={item.public_id} secure="true"/>
        </li>)}
      </ul>;
    }

    return (
      <div className="App">
        <h4>Images list:</h4>

        {list}

        <h4>Uploading images:</h4>
        <Form ref="form" submit={(e) => this.submit(e)}/>
      </div>
    );
  }
}

export default View;
