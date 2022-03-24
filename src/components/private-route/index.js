import { Route, Redirect } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(state => state.employeeData.signedIn);

  if (isAuthenticated) {
    return <Route path={props.path} component={() => <props.component />} />;
  } else {
    return <Redirect to='/' />;
  }
};

export default connect((r) => r)(PrivateRoute);
