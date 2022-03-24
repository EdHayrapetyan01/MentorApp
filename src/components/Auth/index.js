import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEmployees, changeStateByNestedKey, changeStateByKey, setError } from '../../store/actions/employeeActions';
import Helpers from '../../helpers/helper';
import { isEmpty } from 'lodash';

import './styles.scss';

function SignUp() {
  const utils = new Helpers();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showOptions, setShowOptions] = useState(false);
  const [optionErr, setOptionErr] = useState('');

  // selectors
  const employees = useSelector((state) => state.employeeData.employees);
  const signUpData = useSelector((state) => state.employeeData.signUp);
  const selectedCategories = useSelector((state) => state.employeeData.selectedCategories);
  const uniqueCategories = utils.getUniqueValuesFromArrayOfObjs(employees.employeesList, employees.matchCategories);
  const userData = useSelector((state) => state.employeeData.user);
  const { password, confirmPassword } = useSelector((state) => state.employeeData.user);
  const error = useSelector((state) => state.employeeData.error);

  useEffect(() => {
    dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function continueRegistration() {
    // TODO add all inputs validation uppon this click (out of scope of this feature)
    dispatch(changeStateByNestedKey('signUp', 'visible', !signUpData.visible));
    setShowOptions(!showOptions);
  }

  function getSelectedCategories(value, category) {
    dispatch(changeStateByNestedKey('selectedCategories', category, value));
    const suggestionsList = utils.getSuggestions(selectedCategories, employees.employeesList);
    dispatch(changeStateByNestedKey('employees', 'matchedEmployees', suggestionsList));
  }

  function validate(password, confirmPassword) {
    if (password === '' || confirmPassword === '') {
      dispatch(setError('Please fill in all fields'));
    } else if (password !== confirmPassword) {
      dispatch(setError('Passwords does not match'));
    } else if (isEmpty(selectedCategories)) {
      setOptionErr('please take option');
    } else {
      dispatch(setError(''));
      setOptionErr('');
      dispatch(changeStateByKey('signedIn', true));
      clearInputs();
      history.push('/manage-profiles');
    }
  }

  function register(password, confirmPassword) {
    validate(password, confirmPassword);
  }

  const clearInputs = () => {
    userData.name = '';
    userData.email = '';
    userData.password = '';
    userData.confirmPassword = '';
  };

  // set data to localstorage
  if (userData.name && userData.email) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-5 mx-auto' style={{ marginTop: '40px' }}>
            <div className='card'>
              <div className='card-body'>
                <h1 className='text-center pb-4 pt-3'>
                  <span>sign up</span>
                </h1>

                {showOptions ? (
                  <>
                    <div>
                      <p className='error'>{error}</p>
                      <label htmlFor='password'></label>
                      <input
                        className='form-control'
                        type='password'
                        id='password'
                        placeholder='Password'
                        value={userData.password}
                        onChange={(e) => dispatch(changeStateByNestedKey('user', 'password', e.target.value))}
                      />
                      <label htmlFor='confirm-password'></label>
                      <input
                        className='form-control'
                        type='password'
                        id='confirm-password'
                        placeholder='Confirm password'
                        value={userData.confirmPassword}
                        onChange={(e) => dispatch(changeStateByNestedKey('user', 'confirmPassword', e.target.value))}
                      />
                      <br />
                    </div>

                    <span>To Make Better Choices, Look at All Your Options</span>
                    <p className='error'>{optionErr}</p>

                    <ul style={{ listStyleType: 'none' }}>
                      {employees.matchCategories.map((category, index) => {
                        return (
                          <li key={`${category}${index}`}>
                            <select
                              className='dropdown'
                              onChange={(e) => getSelectedCategories(e.target.value, category)}
                            >
                              <option>{category}</option>
                              {uniqueCategories.map((empl, ind) => {
                                return (
                                  <option className='dropdown' key={`${empl[category]}${ind}`}>
                                    {empl[category]}
                                  </option>
                                );
                              })}
                            </select>
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      style={{ width: '100%', marginBottom: '30px', marginTop: '20px' }}
                      className='btn btn btn-danger'
                      onClick={() => setShowOptions(false)}
                    >
                      prev
                    </button>
                    <button
                      style={{ width: '100%' }}
                      className='btn btn btn-success'
                      onClick={() => register(password, confirmPassword)}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    <div className='form-group'>
                      <input
                        required
                        className='form-control'
                        type='text'
                        id='name'
                        placeholder='name'
                        value={userData.name}
                        onChange={(e) => dispatch(changeStateByNestedKey('user', 'name', e.target.value))}
                      />
                      <label htmlFor='name'></label>
                    </div>

                    <div className='form-group'>
                      <input
                        required
                        className='form-control'
                        type='email'
                        id='email'
                        placeholder='email'
                        value={userData.email}
                        onChange={(e) => dispatch(changeStateByNestedKey('user', 'email', e.target.value))}
                      />
                      <label htmlFor='name'></label>
                    </div>
                    <button
                      style={{ backgroundColor: 'cadetblue', color: 'white' }}
                      className='btn btn btn-block'
                      disabled={!userData.name || !userData.email}
                      onClick={() => continueRegistration()}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((r) => r)(SignUp);
