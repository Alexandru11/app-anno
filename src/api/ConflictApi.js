import Client from './Client';

export default {
  async conflicts(userId, cb) {
    await Client.execute('get', `/conflict/${userId}`, null)
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },
};
