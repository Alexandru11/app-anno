<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data: () => ({
    open: ['public'],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    tree: [],
    items: [
      {
        name: 'public',
        children: [
          {
            name: 'static',
            children: [{
              name: 'logo.png',
              file: 'png',
            }],
          },
          {
            name: 'favicon.ico',
            file: 'png',
          },
          {
            name: 'index.html',
            file: 'html',
          },
        ],
      },
      {
        name: 'fileName1',
        file: 'txt',
      },
      {
        name: 'fileName1.json',
        file: 'json',
      },
      {
        name: 'fileName2',
        file: 'txt',
      },
      {
        name: 'fileName2.json',
        file: 'json',
      },
      {
        name: 'fileName3',
        file: 'txt',
      },
      {
        name: 'fileName3.json',
        file: 'json',
      },
      {
        name: 'fileName4',
        file: 'txt',
      },
      {
        name: 'fileName5',
        file: 'txt',
      },
      {
        name: 'fileName6',
        file: 'txt',
      },
      {
        name: 'fileName7',
        file: 'txt',
      },
    ],
  }),
};
</script>
