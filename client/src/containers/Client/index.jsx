import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectuserData } from '@containers/Client/selectors';

const Client = ({ login, children, adminOnly, sellerOnly, userData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    } else if (adminOnly && userData.role !== 'admin') {
      navigate('/forbidden');
    } else if (sellerOnly && userData.role !== 'seller' && userData.role !== 'admin') {
      navigate('/forbidden');
    }
  }, [adminOnly, login, navigate, sellerOnly, userData.role]);

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
