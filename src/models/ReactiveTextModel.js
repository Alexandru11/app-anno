const model = (function () {
  return () => ({
    selection: {
      value: '',
      startElement: null,
      endElement: null,
    },
    textTokens: [],

    resetOffsets() {
      this.selection.startElement = null;
      this.selection.endElement = null;
    },
  });
}());

export default model;
