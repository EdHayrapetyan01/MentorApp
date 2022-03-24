const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs')

class DataParser {
    parseCSVtoJSON() {
        let filePath = path.join(__dirname, '../data', 'employees.csv');
        const wb = XLSX.readFile(filePath);
        const sheetName = wb.SheetNames[0];
        const jsonContent = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        return jsonContent;
    }
    /**
     * Function writes given json in file whit given name
     * 
     * @param {JSON} jsonContent - json data to be written in file
     * @param {string} fileName - name of file where content should be written
     */
    writeJSONIntoFile(jsonContent, fileName = 'data.json') {
        const strContent = JSON.stringify(jsonContent);
        const finalContent = `{\n\t"data": ${strContent}\n}`
        const filePath = path.join(__dirname, '../data', fileName);
        try {
            fs.writeFileSync(filePath, finalContent, { flag: 'w+' })
        } catch (err) {
            throw new Error(`An error occured while writing in file: ${fileName}\n${err}`)
        }
    }
}
module.exports = DataParser;