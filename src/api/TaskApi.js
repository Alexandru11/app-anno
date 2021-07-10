import Client from './Client';

export default {
  async taskList(cb, userId) {
    await Client.execute('get', `/task/user=${userId}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },

  async taskParams(id, cb) {
    await Client.execute('get', `/task/${id}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },
};
