const model = (function model() {
  return () => ({
    expanded: [],
    singleExpand: false,
    taskHeaders: [
      { text: 'Date of creation', value: 'createdAt' },
      { text: 'Type of task', value: 'type' },
      { text: 'Maximum number of Users ', value: 'maxUsers' },
      { text: '', value: 'data-table-expand' },
      { text: '', value: 'data-table-select' },
    ],
    tasks: [],
    selected: [],
  });
}());

export default model;
