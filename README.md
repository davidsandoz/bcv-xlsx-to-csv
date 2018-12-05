# BCV XLSX to CSV converter

This Node.js TypeScript script converts the XLSX banking statement file (which is actually an HTML file) from the Banque Cantonale Vaudoise (BCV) to CSV file.

## Setup
```
$ npm install
```

## Usage
- Move the XLSX file in the `input` directory and rename it to `operations.html`
- Run `npm start`
- Get the converted CSV `operations.csv` from the `output` directory