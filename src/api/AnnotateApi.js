import Client from './Client';

export default {
  async createAnnotation(cb, annotation, errCb) {
    await Client.execute('post', '/annotation', annotation)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
        errCb(e.message);
      });
  },

  async updateAnnotation(cb, id, annotationProperties, errCb) {
    await Client.execute('put', `/annotation/${id}`, annotationProperties)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
        errCb(e.message);
      });
  },

  async getAnnotation(cb, id) {
    await Client.execute('get', `/annotation/${id}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },

  async annotationsList(cb, userId) {
    await Client.execute('get', `/annotation/list/${userId}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },

  async getAnnotationsFile(cb, userId) {
    try {
      await Client.executeDownload(`/annotation/file/${userId}`);
      cb();
    } catch (e) {
      console.log('Something wrong happend!');
    }
  },
};
