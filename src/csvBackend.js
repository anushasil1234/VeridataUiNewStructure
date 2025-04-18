import Papa from "papaparse";

class CsvBackend {
  constructor(services, backendOptions, i18nextOptions) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;

    this.init();
  }

  init() {
    console.log("CsvBackend initialized with options:", this.backendOptions);
  }

  // Method to read translations
  read(language, namespace, callback) {
    const filePath = `/locales/${language}/translation.csv`;
    //console.log(language);

    fetch(filePath)
      .then((response) => response.text())
      .then((csvData) => {
        // console.log("Raw CSV Data:", csvData);
        const result = Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        if (result.errors.length) {
          console.error("Error parsing CSV:", result.errors);
          return callback(result.errors, false);
        }

        //console.log("Parsed Data:", result.data);

        const translations = {};
        result.data.forEach((row) => {
          if (row.key && row.value) {
            translations[row.key] = row.value;
          }
        });

        callback(null, translations);
      })
      .catch((error) => {
        console.error("Error reading translations:", error);
        callback(error, false);
      });
  }

  create(language, namespace, data, callback) {
    console.log(
      `Creating translations for language: ${language}, namespace: ${namespace}`
    );
    callback(null, true);
  }
}

CsvBackend.type = "backend";

export default CsvBackend;
