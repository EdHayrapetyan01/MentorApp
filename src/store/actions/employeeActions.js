import axios from 'axios';
// TODO: add types.

const DATA_SERVER = 'http://localhost:3001/data';

export function changeStateByNestedKey(key1, key2, val) {
  return {
    type: 'changeStateByNestedKey',
    key1,
    key2,
    val,
  };
}
export function appendToStateByNestedKey(key1, key2, val) {
  return {
    type: 'appendToStateByNestedKey',
    key1,
    key2,
    val,
  };
}

export function changeStateByKey(key, val) {
  return {
    type: 'changeStateByKey',
    key,
    val,
  };
}

export function setError(msg) {
  return {
    type: 'setError',
    msg,
  };
}

export function deleteByIndex(key1, key2, index) {
  return {
    type: 'deleteByIndex',
    key1,
    key2,
    index,
  };
}

export function getEmployees() {
  return function (dispatch) {
    axios
      .get(DATA_SERVER)
      .then((response) => {
        const allCategories = Object.keys(response.data[0]);
        const categoriesToMatch = allCategories.filter(
          (el) => el !== 'first_name' && el !== 'last_name' && el !== 'gender' && el !== 'email'
        );
        dispatch(changeStateByNestedKey('employees', 'matchCategories', categoriesToMatch));
        dispatch(changeStateByNestedKey('employees', 'employeesList', response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
