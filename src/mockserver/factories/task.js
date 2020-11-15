import { Factory } from 'miragejs';
import { v4 as UUID } from 'uuid';

export default {
  task: Factory.extend({
    taskId() {
      return UUID();
    },
    createdAt(i) {
      return Date() + i;
    },
    type(i) {
      return `Type ${i}`;
    },
    maxUsers(i) {
      return i;
    },
    description() {
      return 'This is task where you need to label text that is...';
    },
  }),
};
