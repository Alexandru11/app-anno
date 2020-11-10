<template>

<div>
<v-row>
    <v-col
      cols="12"
      sm="2"
    >
      <v-sheet
        rounded="lg"
        outlined
      >
        <FileExplorer
          @set-main-content="setMainContent"
        />
      </v-sheet>
    </v-col>
    <v-col
          cols="12"
          sm="8"
    >
      <v-sheet
        rounded="lg"
        min-height="268"
        outlined
      >
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

      <reactiveText
        ref="reactiveText"
        :text="document.text"
        @selected-text="onTextSelection"
        class="pa-6"
      >
      </reactiveText>

          <v-text-field
            id="text"
            ref="annotation"
            solo
            placeholder="Write your custom Entity"
            v-model="annotation.value"
            :rules="annotation.rules"
            prepend-inner-icon="mdi-plus-box-outline"
            @click:prepend-inner="doCreateEntity"
            @keydown.enter="doCreateEntity"
            class="px-4"
          ></v-text-field>

      </v-sheet>
    </v-col>
    <v-col
      cols="12"
      sm="2"
    >
      <sideAnnotationMenu
        :annotations="annotations"
      >
      </sideAnnotationMenu>
    </v-col>
</v-row>

  <annotationMenu
      :selectedText="annotation.value"
      :dialog="annotation.menuStatus"
      @updateDialog="update"
      @doSaveAnnotation="addAnnotation"
  >
  </annotationMenu>

</div>
</template>

<script>
import TopicLabelerSubComponent from '@/components/tabs/annotate/topicLabeler.vue';
import AnnotationMenuComponent from '@/components/tabs/annotate/annotationMenu.vue';
import SideAnnotationMenuComponent from '@/components/tabs/annotate/sideAnnotationMenu.vue';
import annotateFormatters from '@/components/formatter/annotateFormatters';
import FileExplorer from '@/components/tabs/annotate/fileExplorer.vue';
import ReactiveText from '@/components/tabs/annotate/reactiveText.vue';

// import mixin from '../../mixins/validateToken';

export default {
  name: 'AnnotateComponent',
  components: {
    FileExplorer,
    topicLabeler: TopicLabelerSubComponent,
    annotationMenu: AnnotationMenuComponent,
    sideAnnotationMenu: SideAnnotationMenuComponent,
    reactiveText: ReactiveText,
  },
  data: () => ({
    instruction: {
      text: '',
    },
    document: {
      topic: '',
      sentiment: '',
      emotion: '',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    annotations: [],
    annotation: {
      value: '',
      startPosition: null,
      endPosition: null,
      rules: [
        (v) => !!v || 'Define an annotation or selection first',
      ],
      menuStatus: false,
    },
  }),
  methods: {
    setMainContent(text) {
      this.document.text = text;
    },
    sentimentLabel() {
      return annotateFormatters.getSentimentLabel(this.document.sentiment);
    },
    onTextSelection({
      value,
      startPosition,
      endPosition,
    }) {
      if (value !== '') {
        this.annotation.value = value;
        this.annotation.menuStatus = true;
        this.annotation.startPosition = startPosition;
        this.annotation.endPosition = endPosition;
        // this.doCreateEntity();
      }
    },
    addAnnotation() {
      this.annotations.push(this.annotation.value);
      this.annotation.value = '';
      this.$refs.reactiveText.tagValues(this.annotations);
    },
    doCreateEntity() {
      if (this.$refs.annotation.validate()) this.annotation.menuStatus = true;
    },
    update(value) {
      this.annotation.menuStatus = value;
    },

    alert() {
      this.alert();
    },
  },
};

</script>
