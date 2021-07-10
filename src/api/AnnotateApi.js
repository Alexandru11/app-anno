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
};
