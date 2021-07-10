import { Server, Model, belongsTo } from 'miragejs';
import hookTaskRoutes from './routes/task';
import objectFactories from './factories/objects';

export default function createServer() {
  new Server({
    factories: { ...objectFactories },

    models: {
      task: Model,
      parameter: Model.extend({
        task: belongsTo(),
      }),
    },

    seeds(server) {
      server.createList('task', 10).forEach((task) => {
        server.create('parameter', { task });
      });
    },
    routes() {
      this.passthrough('http://localhost:4003/**');
      this.passthrough('https://dev-bkz4ssh2.eu.auth0.com/**');
      this.namespace = 'api';

      hookTaskRoutes(this);
    },
  });
}
