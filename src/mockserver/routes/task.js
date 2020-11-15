export default function hookRoutes(context) {
  context.get('/task', (schema) => ({
    values: schema.tasks.all().models,
  }));
}
