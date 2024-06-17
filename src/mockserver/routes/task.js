import { Response } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';

export default function hookRoutes(context) {
  context.get('/task', (schema) => ({
    values: schema.tasks.all().models,
  }));

  context.get('/taskParams/:id', (schema, request) => {
    const { id } = request.params;
    return schema.parameters.findBy({ taskId: id });
  });

  context.post('/annotations', (schema, request) => {
    const attributes = JSON.parse(request.requestBody);
    attributes.id = uuidv4();

    const res = { annotation: attributes };
    return new Response(200, {}, res);
  });
}
