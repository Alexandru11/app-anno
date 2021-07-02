import Client from './Client';

export default {
  async taskList(cb) {
    await Client.execute('get', '/task', null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },

  async taskParams(id, cb) {
    await Client.execute('get', `/taskParams/${id}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },
};
