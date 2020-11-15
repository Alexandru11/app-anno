const model = (function model() {
  return () => ({
    selection: {
      value: '',
      startElement: null,
      endElement: null,
      startPosition: null,
      endPosition: null,
    },
    textTokens: [],

    resetOffsets() {
      this.selection.startElement = null;
      this.selection.endElement = null;

      this.selection.startPosition = null;
      this.selection.endPosition = null;
    },
  });
}());

export default model;
