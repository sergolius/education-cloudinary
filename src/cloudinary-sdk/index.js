import cloudinary from 'cloudinary-core'

class Cloudinary {
  constructor(cloudName) {
    this.cloudinary = new cloudinary.Cloudinary({cloud_name: cloudName, secure: true});
    this.baseAPI = `https://api.cloudinary.com/v1_1/${cloudName}`;
    this.baseRES = `https://res.cloudinary.com/${cloudName}`;
  }

  create(file, {uploadPreset, tag, folder}) {
    const body = new FormData();
    body.append('file', file, file.name);
    body.append('upload_preset', uploadPreset);
    body.append('tags', tag);
    body.append('folder', folder);

    return fetch(`${this.baseAPI}/image/upload`, {
      method: 'post',
      body: body,
    }).then(resp => resp.json())
  }

  findByTag(tag) {
    return fetch(`${this.baseRES}/image/list/${tag}.json`).then(resp => resp.json());
  }
}

export {Cloudinary};
