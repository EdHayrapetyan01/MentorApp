class Utils {
    /**
     * Function filters array of objects by given property
     * 
     * @param {Array} arrOfObjs 
     * @param {Array} filterBy 
     * @returns Filtered array with objects
     */
    getUniqueValuesFromArrayOfObjs(arrOfObjs, filterBy) {
        let uniqueCategories = arrOfObjs;
        for (let cat of filterBy) {
            uniqueCategories = uniqueCategories.filter((item, i, ar) => {
                const categoryValuesArr = ar.map((el) => el[cat]);
                return categoryValuesArr.indexOf(item[cat]) === i
            });
        }
        return uniqueCategories
    }

    /**
     * find and returns matched employees from chosen categories
     * 
     * @param {Object} selectedCategories 
     * @param {Array} employeesList 
     * @returns Array of matched employees
     */
    getSuggestions(selectedCategories, employeesList) {
        const matches = [];
        for (let [category, value] of Object.entries(selectedCategories)) {
            for (let employee of employeesList) {
                if (employee[category] === value) {
                    matches.push(employee)
                }
            }
        }
        const unique = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
        return Object.values(unique)
    }

}

module.exports = Utils;