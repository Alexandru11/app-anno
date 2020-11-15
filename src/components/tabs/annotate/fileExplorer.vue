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
import fileExplorerModel from '@/models/tabs/annotate/FileExplorerModel';
import manager from '@/utils/FileSystemManager';

export default {
  name: 'FileExplorer',
  data: fileExplorerModel,
  methods: {
    async onBrowseFolder() {
      const that = this;
      try {
        await manager.browseFolder();
        that.items = await manager.getFiles();
      } catch (error) {
        console.log(error, 'Process aborted by user');
      }
    },

    async onItemClick(items) {
      try {
        if (items.length) {
          await this.sendContentForFile(items[0]);

          manager.setDocFile(items[0]);
          const annotationFileName = manager.convertFileType(items[0]);
          manager.setAnnotationFile(annotationFileName);
          // pre-create json file with writable rights for already opened file
          await manager.writeToFile(annotationFileName, true);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async sendContentForFile(file) {
      const content = await manager.getFileContent(file) || '';
      this.$emit('set-main-content', content);
    },

  },
};
</script>
