import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeStateByKey } from '../../store/actions/employeeActions';

import './styles.scss';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.employeeData.signedIn);
  const dispatch = useDispatch();

  const singOut = () => {
    dispatch(changeStateByKey('signedIn', false));
    localStorage.removeItem('user')
  }
  return (
    <nav className='navbar navbar-expand-sm' style={{ background: 'black' }}>
      <Link className='nav-link' to='/' style={{marginLeft:100}}>
        Home
      </Link>
      <div className='container'>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            {isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profile'>
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/manage-profiles'>
                    Manage
                  </Link>
                </li>

                <button className='sign-out-btn'
                 onClick={singOut}>
                  sign out
                </button>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/sign-up'>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
