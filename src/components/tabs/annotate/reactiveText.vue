<template>
<v-sheet
>
  <div
    ref='mainTextArea'
    id='mainTextArea'
  >
    <span v-for="token in textTokens"
          :key="token.key"
          :id="token.key"
          @mouseup="onSelectionUp"
          @mousedown="onSelectionDown"
          class="token">
      {{ token.value }}
    </span>
  </div>
</v-sheet>
</template>

<script>
import reactiveTextModel from '@/models/ReactiveTextModel';

export default {
  props: ['text', 'onSavedAnnotation'],
  data: reactiveTextModel,
  created() {
    this.tokenizeText();
  },
  watch: {
    text() {
      this.tokenizeText();
    },
  },
  methods: {
    onSelectionUp(event) {
      this.selection.endElement = this.$jQuery(event.target).next();
      this.saveSelection();
      this.$emit('selected-text', this.selection.value);

      this.resetWindowSelection();
      this.resetOffsets();
    },
    onSelectionDown(event) {
      this.selection.startElement = event.target;
    },
    tagValues(list) {
      console.log(list);
    },
    saveSelection() {
      let highlight = '';
      this.$jQuery.each(
        this.$jQuery(this.selection.startElement)
          .nextUntil(this.selection.endElement).addBack(), (index, elem) => {
          highlight += elem.innerText;
        },
      );
      this.selection.value = highlight;
    },
    resetWindowSelection() {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {
        document.selection.empty();
      }
    },
    tokenizeText() {
      const tokens = this.text.split(/( )/g);
      this.textTokens = tokens.map((token, idx) => {
        if (token === ' ') {
          return {
            key: `token-space-${idx}`,
            value: token,
          };
        }
        return {
          key: `token-${idx}`,
          value: token.trim(),
        };
      });
    },
  },
};
</script>
