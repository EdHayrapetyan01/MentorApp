import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteByIndex, appendToStateByNestedKey, setError } from '../../store/actions/employeeActions';
import { Table, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';




function MatchSuggestion() {

  const dispatch = useDispatch();
  const history = useHistory();

  const employees = useSelector((state) => state.employeeData.employees);
  const error = useSelector((state) => state.employeeData.error);

  function selectFromSuggestionList(index) {
    if (employees.choosedSuggestions.length >= 5) {
      dispatch(setError('You can\'t select more than 5 mentors'));
    } else {
      dispatch(setError(''));
      const itemToBeAdded = employees.matchedEmployees[index];
      dispatch(deleteByIndex('employees', 'matchedEmployees', index));
      dispatch(appendToStateByNestedKey('employees', 'choosedSuggestions', itemToBeAdded));
    }
  }

  function deSelectFromSuggestionList(index) {
    dispatch(setError(''));
    const itemToBeAdded = employees.choosedSuggestions[index];
    dispatch(deleteByIndex('employees', 'choosedSuggestions', index));
    dispatch(appendToStateByNestedKey('employees', 'matchedEmployees', itemToBeAdded));
  }

  return (
    <>
      <div className='manage-profile-container'>
        <div>
          <div>
            <p className='manage-text'>
             Manage profiles
            </p>
          </div>
          {employees.choosedSuggestions.length === 0 ? (
            ''
          ) : (
            <>
              <h3 style={{ marginTop: '40px' }}>Selected profiles</h3>
              <p>{error}</p>

              <Table style={{ width: '80%', margin: '0 auto', background: 'white' }}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Job Title</th>
                  </tr>
                </thead>
                {employees.choosedSuggestions.map((employee, ind) => {
                  return (
                    <tbody  key={uuidv4()} style={{ height: '70px' }}>
                      <tr  key={uuidv4()}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.city}</td>
                        <td>{employee.country}</td>
                        <td>{employee.email}</td>
                        <td>{employee['job title']}</td>

                        <button className='btn btn-danger' onClick={() => deSelectFromSuggestionList(ind)}>
                          delete
                        </button>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
        </div>
        <div>
          {employees.matchedEmployees.length === 0 ? (
            <h3 style={{ marginTop: '70px' }}>
              There are no available employees in suggestion list, go back and select from the list
            </h3>
          ) : (
            <>
              <h3 style={{ marginTop: '70px' }}>Matched profiles</h3>

              <Table style={{ width: '80%', margin: '0 auto', background: 'white', marginBottom: '40px' }}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Job Title</th>
                  </tr>
                </thead>
                {employees.matchedEmployees.map((employee, ind) => {
                  return (
                    <tbody key={uuidv4()} style={{ height: '70px' }}>
                      <tr  key={uuidv4()}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.city}</td>
                        <td>{employee.country}</td>
                        <td>{employee.email}</td>
                        <td>{employee['job title']}</td>

                        <Button className='btn btn-primary' 
                        onClick={() => selectFromSuggestionList(ind)}>
                          Add
                        </Button>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
          <div className='confirm'>
            <Button
              disabled={!employees.choosedSuggestions.length}
              color='success'
              outline
              onClick={() => history.push('/profile')}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect((r) => r)(MatchSuggestion);
