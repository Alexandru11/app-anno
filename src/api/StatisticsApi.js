import Client from './Client';

export default {
  async getStatistics(userId, cb) {
    await Client.execute('get', `/statistics/${userId}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },
};
