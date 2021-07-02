const model = (function model() {
  return () => ({
    task: {
      params: {
        labels: undefined,
      },
    },
    document: {
      topic: '',
      sentiment: '',
      emotion: '',
      text: '',
    },
    annotations: [],
    annotation: {
      value: '',
      startPosition: null,
      endPosition: null,
    },
    rules: {
      annotation: [
        (v) => !!v || 'Define an annotation or selection first',
      ],
    },
    menuStatus: false,
    resetDefaultAnnotation() {
      this.annotation.value = '';
      this.annotation.startPosition = null;
      this.annotation.endPosition = null;
    },
    resetDocumentOverview() {
      this.document.topic = '';
      this.document.sentiment = '';
      this.document.emotion = '';
      this.document.text = '';
    },
    resetTaskParams() {
      this.task.params.labels = undefined;
    },
    resetAnnotationsContent() {
      this.annotations = [];
    },
  });
}());

export default model;
