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
          class="token"
          :data-start-position="token.startPosition"
          :data-end-position="token.endPosition">
      {{ token.value }}
    </span>
  </div>
</v-sheet>
</template>

<script>
import reactiveTextModel from '@/models/tabs/annotate/ReactiveTextModel';

const SPECIAL_CHARS = /[|\\/~^:,.;?!&%$@*+]/g;

export default {
  name: 'ReactiveText',
  props: ['text', 'onSavedAnnotation'],
  data: reactiveTextModel,
  watch: {
    text() {
      this.clearContent();
      this.tokenizeText();
    },
  },
  methods: {
    onSelectionUp(event) {
      this.selection.endElement = event.target;
      this.saveSelectionValue();
      this.saveSelectionPosition();

      this.emitSelectionToParent();
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
    emitSelectionToParent() {
      this.$emit('selected-text', this.selection);
    },
    saveSelectionValue() {
      let highlight = '';
      this.$jQuery.each(
        this.$jQuery(this.selection.startElement)
          .nextUntil(this.selection.endElement.nextElementSibling).addBack(), (index, elem) => {
          highlight += elem.innerText;
        },
      );
      this.selection.value = highlight;
    },
    saveSelectionPosition() {
      this.selection.startPosition = this.selection.startElement.getAttribute('data-start-position');
      this.selection.endPosition = this.selection.endElement.getAttribute('data-end-position');
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
          this.addToken(`token-space-${idx}`, token);
        } else if (token.match(SPECIAL_CHARS)) {
          const trimmed = token.replace(SPECIAL_CHARS, '');
          const matched = token.match(SPECIAL_CHARS);
          matched.splice(token.indexOf(trimmed), 0, trimmed);
          matched.forEach((m, mIdx) => {
            this.addToken(`token-${idx}.${mIdx}`, m);
          });
        } else {
          this.addToken(`token-${idx}`, token);
        }
      });
    },
    addToken(key, value) {
      const startPosition = this.textTokens.reduce((acc, cv) => acc + cv.value.length, 0);
      const endPosition = startPosition + value.length;
      this.textTokens.push({
        key,
        value,
        startPosition,
        endPosition,
      });
    },
    clearContent() {
      this.textTokens = [];
      // this.$jQuery(this.$refs.mainTextArea).empty();
    },

  },
};
</script>
