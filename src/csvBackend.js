import Papa from 'papaparse';
class CsvBackend {
  constructor(services, backendOptions, i18nextOptions) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
    this.init();
  }
  init() {
  }
  read(language, namespace, callback) {
    const filePath = `/locales/${language}/translation.csv`;
    fetch(filePath)
      .then((response) => response.text())
      .then((csvData) => {
        const result = Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        if (result.errors.length) {
          console.error('Error parsing CSV:', result.errors);
          return callback(result.errors, false);
        }
        const translations = {};
        result.data.forEach((row) => {
          if (row.key && row.value) {
            translations[row.key] = row.value;
          }
        });
        callback(null, translations);
      })
      .catch((error) => {
        callback(error, false);
      });
  }
  create(language, namespace, data, callback) {
    callback(null, true);
  }
}
CsvBackend.type = 'backend';
export default CsvBackend;
