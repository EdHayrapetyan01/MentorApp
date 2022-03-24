const state = {
    error: "",
    employees:{ employeesList:[], matchCategories:[], matchedEmployees:[], choosedSuggestions:[] },
    selectedCategories:{},
    signUp:{ visible: false},
    user: {name: "", email: "" , password: "", confirmPassword: "", isValid: false},
    signedIn: false
}

export default state;