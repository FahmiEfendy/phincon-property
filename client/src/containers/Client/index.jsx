import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectuserData } from '@containers/Client/selectors';

const Client = ({ login, children, isAdmin, userData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    } else if (isAdmin && userData.role !== 'admin') {
      navigate('/forbidden');
    }
  }, [isAdmin, login, navigate, userData.role]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  children: PropTypes.element,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  userData: selectuserData,
});

export default connect(mapStateToProps)(Client);
