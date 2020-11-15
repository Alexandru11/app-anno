import { Server, Model } from 'miragejs';
import hookTaskRoutes from './routes/task';
import taskFactory from './factories/task';

export default function createServer() {
  new Server({
    factories: { ...taskFactory },

    models: {
      task: Model,
    },

    seeds(server) {
      server.createList('task', 10);
    },
    routes() {
      this.namespace = 'api';

      hookTaskRoutes(this);
    },
  });
}
