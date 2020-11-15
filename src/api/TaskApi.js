export default {
  async taskList(cb) {
    await fetch('/api/task')
      .then((res) => res.json())
      .then((res) => cb(res))
      .catch((e) => {
        console.error(e.message);
      });
  },
};
