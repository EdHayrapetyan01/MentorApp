import {combineReducers} from 'redux'
import employeeData from './employeeReducer'

let root = combineReducers({employeeData})

export default root;