const DataParser = require('../helpers/DataParser')

function prepareFakeApi() {
    const dp = new DataParser();
    const content = dp.parseCSVtoJSON()
    dp.writeJSONIntoFile(content)
}

prepareFakeApi();