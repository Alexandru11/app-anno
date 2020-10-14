<template>
<div>
  <v-expansion-panels>
    <v-expansion-panel>
    <v-expansion-panel-header disable-icon-rotate>Overall Document
      <template v-slot:actions>
        <v-icon>
          mdi-file-document-edit
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
    <v-expansion-panels
      focusable
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Topic
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span
                    v-if="open"
                    key="0"
                  >
                    Enter a topic for the document
                  </span>
                  <span
                    v-else
                    key="1"
                  >
                    {{ document.topic }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="document.topic"
            placeholder="IPhone X Review"
          ></v-text-field>
          <topicLabeler></topicLabeler>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
              <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Sentiment
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span
                    v-if="open"
                    key="0"
                  >
                    Enter a sentiment for the document
                  </span>
                  <span
                    v-else
                    key="1"
                  >
                    {{ sentimentLabel() }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-radio-group
            v-model="document.sentiment"
            :mandatory="false"
            row
          >
            <v-radio
              label='Extremely negative'
              color='red darken-4'
              value='extreme-neg-radio'
            ></v-radio>
            <v-radio
              label='Very negative'
              color='red darken-2'
              value='very-neg-radio'
            ></v-radio>
            <v-radio
              label='Negative'
              color='red'
              value='neg-radio'
            ></v-radio>
            <v-radio
              label='Neutral'
              color='grey'
              value='neutral-radio'
            ></v-radio>
            <v-radio
              label='Positive'
              color='green'
              value='pos-radio'
            ></v-radio>
            <v-radio
              label='Very positive'
              color='green darken-2'
              value='very-pos-radio'
            ></v-radio>
            <v-radio
              label='Extremely negative'
              color='green darken-4'
              value='extreme-pos-radio'
            ></v-radio>
          </v-radio-group>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
              <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Emotion
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span
                    v-if="open"
                    key="0"
                  >
                    Enter an emotion for the document
                  </span>
                  <span
                    v-else
                    key="1"
                  >
                    {{ document.emotion }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="document.emotion"
            placeholder="Happiness"
          ></v-text-field>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-textarea
    solo
    auto-grow
    :value="text"
    v-on:click="onTextClick"
  >
  </v-textarea>
</div>
</template>

<script>
import TopicLabelerSubComponent from '@/components/tabs/topicLabeler.vue';
import annotateFormatters from '../formatter/annotateFormatters';
// import mixin from '../../mixins/validateToken';

export default {
  name: 'AnnotateComponent',
  components: {
    topicLabeler: TopicLabelerSubComponent,
  },
  data: () => ({
    document: {
      topic: '',
      sentiment: '',
      emotion: '',
    },
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }),
  methods: {
    sentimentLabel() {
      return annotateFormatters.getSentimentLabel(this.document.sentiment);
    },
    onTextClick() {
      console.log(window.getSelection().toString());
    },
  },
};

</script>
