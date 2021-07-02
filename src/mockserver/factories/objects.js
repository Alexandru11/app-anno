import { Factory } from 'miragejs';

export default {
  task: Factory.extend({
    createdAt(i) {
      return Date() + i;
    },
    type(i) {
      return `Type ${i}`;
    },
    maxUsers() {
      return 3;
    },
    description() {
      return 'This is task where you need to label text that is...';
    },
  }),
  parameter: Factory.extend({
    values() {
      return {
        text: "They were delighted by the Hilton's location: surrounded by vibrant nightlife, and in close proximity to major landmarks in Paris. And as luck would have it, Paris Hilton happened to be staying in the room next door!",
        labels: [
          {
            name: 'T_ORG',
            display_name: 'Organization',
          },
          {
            name: 'T_LOC',
            display_name: 'Location',
          },
          {
            name: 'T_PERS',
            display_name: 'Person',
          },
        ],
      };
    },
  }),
};
