export default (function () {
  let dirHandle;
  const TYPE_CHECKER = {
    isText(file) {
      return file.includes('.txt');
    },
    isPdf(file) {
      return file.includes('.pdf');
    },
  };

  return {
    async browseFolder() {
      dirHandle = await window.showDirectoryPicker();
    },

    async getFiles() {
      const files = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const entry of dirHandle.values()) {
        if (TYPE_CHECKER.isText(entry.name)) files.push({ name: entry.name, file: 'txt' });
        if (TYPE_CHECKER.isPdf(entry.name)) files.push({ name: entry.name, file: 'pdf' });
      }
      return files;
    },

    async getFileContent(name) {
      if (!dirHandle) {
        console.log('Dir handle not defined!');
        return null;
      }
      const fileHandle = await dirHandle.getFileHandle(name, { create: false });

      const file = await fileHandle.getFile();
      const contents = await file.text();
      return contents;
    },
  };
}());
