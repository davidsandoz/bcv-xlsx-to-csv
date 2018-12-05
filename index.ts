import fs from 'fs';
import {JSDOM} from 'jsdom';

const operationsFile = 'input/operations.html'

console.info('Reading input file...');
const rawData = fs.readFileSync(operationsFile);
const dom = new JSDOM(rawData);

console.info('Processing...');
const operationRows = dom.window.document.getElementsByTagName('tbody');

let csvData = 'Execution date,Value date,Description,Amount\n';

const operationLines = Array.from(operationRows)
    .filter(operationRow => {
        return operationRow.id;
    })
    .forEach(operationRow => {
        const operationArray: any[] = Array.from(operationRow.childNodes[1].childNodes).filter(child => child.nodeType === 1).map(cell => {
            if (cell.textContent) {
                return cell.textContent.trim();
            }
        })

        const operation = {
            executionDate: operationArray[0],
            valueDate: operationArray[4],
            description: operationArray[1],
            amount: 0
        }
        if (operationArray[2]) {
            operation.amount = parseFloat(operationArray[2].replace('\'', '')) * -1
        } else if (operationArray[3]) {
            operation.amount = parseFloat(operationArray[3].replace('\'', ''));
        }

        const operationCsvLine = 
            operation.executionDate + ',' +
            operation.valueDate + ',' +
            operation.description + ',' +
            operation.amount + '\n';
        
        csvData += operationCsvLine;
    }
);

console.info('Writing output file...');
fs.writeFileSync('output/operations.csv', csvData);

console.info('Done!');
