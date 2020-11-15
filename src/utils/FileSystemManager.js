export default (function Manager() {
  let dirHandle;
  let docFile;
  let annotationFile;

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

    setDocFile(name) {
      docFile = name;
    },

    getDocFile() {
      return docFile;
    },

    setAnnotationFile(name) {
      annotationFile = name;
    },

    getAnnotationFile() {
      return annotationFile;
    },

    getFileType(name) {
      if (TYPE_CHECKER.isText(name)) return 'txt';
      if (TYPE_CHECKER.isPdf(name)) return 'pdf';
      return undefined;
    },

    convertFileType(name) {
      if (this.getFileType(name)) return name.replace(this.getFileType(name), 'json');
      return undefined;
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

    async verifyPermission(fileHandle, readWrite) {
      const options = {};
      if (readWrite) {
        options.mode = 'readwrite';
      }
      // Check if permission was already granted. If so, return true.
      if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
      }
      // Request permission. If the user grants permission, return true.
      if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
      }
      // The user didn't grant permission, so return false.
      return false;
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

    async writeToFile(name, create = false, content = '') {
      if (!dirHandle) {
        console.log('Dir handle not defined!');
        return null;
      }

      const fileHandle = await dirHandle.getFileHandle(name, { create });
      const writable = await fileHandle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(content);
      // Close the file and write the contents to disk.
      return writable.close();
    },
  };
}());
