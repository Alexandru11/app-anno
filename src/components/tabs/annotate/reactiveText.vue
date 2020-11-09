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
  name: 'ReactiveText',
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
      // #TODO to apply colored label to selected key phrases in list
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

      tokens.forEach((token, idx) => {
        if (token === ' ') {
          this.textTokens.push({
            key: `token-space-${idx}`,
            value: token,
          });
        } else if (token.match(/[|\\/~^:,.;?!&%$@*+]/g)) {
          const trimmed = token.replace(/[|\\/~^:,.;?!&%$@*+]/g, '');
          const matched = token.match(/[|\\/~^:,.;?!&%$@*+]/g);
          matched.splice(token.indexOf(trimmed), 0, trimmed);
          matched.forEach((m, mIdx) => {
            this.textTokens.push({
              key: `token-${idx}${mIdx}`,
              value: m,
            });
          });
        } else {
          this.textTokens.push({
            key: `token-${idx}`,
            value: token.trim(),
          });
        }
      });
    },
  },
};
</script>
