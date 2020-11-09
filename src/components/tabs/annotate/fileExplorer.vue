<template>
    <v-card
      min-height="300"
      class="d-flex justify-center align-center"
    >
      <div >
        <v-btn
          icon
          v-show="items.length === 0"
          v-on:click="onBrowseFolder"
          style=""
        >
          <v-icon size="70">mdi-folder-open</v-icon>
        </v-btn>
      </div>
    <div>
      <v-btn
        v-show="items.length > 0"
        fab
        bottom
        right
        absolute
        v-on:click="onBrowseFolder"
      >
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
    </div>
      <v-treeview
        v-if="items.length > 0"
        v-model="tree"
        :open="open"
        :items="items"
        activatable
        item-key="name"
        open-on-click
        @update:active="onItemClick"
      >
        <template
          v-slot:prepend="{ item, open }"
        >
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>
        </template>
      </v-treeview>
    </v-card>
</template>

<script>
import fileExplorerModel from '@/models/FileExplorerModel';
import browser from '@/utils/FileSystemBrowser';

export default {
  name: 'FileExplorer',
  data: fileExplorerModel,
  methods: {
    async onBrowseFolder() {
      const that = this;
      try {
        await browser.browseFolder();
        that.items = await browser.getFiles();
      } catch (error) {
        console.log(error, 'Process aborted by user');
      }
    },

    async onItemClick(items) {
      if (items.length) await this.loadContentForFile(items[0]);
    },

    async loadContentForFile(file) {
      const content = await browser.getFileContent(file) || '';
      this.$emit('set-main-content', content);
    },
  },
};
</script>
