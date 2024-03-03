import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import encryptPayload from '@utils/encryptPayload';
import { selectError } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import { postLoginRequest, resetLogin } from '@containers/Client/actions';

import classes from './style.module.scss';

const Login = ({ loginError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: '', isValid: true });
  const [password, setPassword] = useState({ value: '', isValid: true });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formValidation = () => {
    let isFormValid = true;

    if (email.value === '') {
      setEmail((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (password.value === '') {
      setPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }

    return isFormValid;
  };

  const loginHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      email: encryptPayload(email.value),
      password: encryptPayload(password.value),
    };

    dispatch(postLoginRequest(payload, () => navigate('/')));
  };

  useEffect(() => {
    if (loginError !== null) {
      dispatch(
        showPopup('global_error', loginError, null, null, () => {
          dispatch(resetLogin());
          dispatch(hidePopup());
        })
      );
    }
  }, [dispatch, loginError]);

  return (
    <Container className={classes.container}>
      <Container className={classes.container_inner}>
        <Box className={classes.wrapper_left} />
        <Box className={classes.wrapper_right}>
          <Typography variant="h5">
            <FormattedMessage id="app_login" />
          </Typography>
          <Box className={classes.input_wrapper}>
            <CustomInput
              label="form_email"
              value={email.value}
              onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.length > 0 })}
              errorLabel={email.isValid ? null : 'form_email_error_required'}
            />
          </Box>
          <Box className={classes.input_wrapper}>
            <Box className={classes.input_wrapper_password}>
              <CustomInput
                fullWidth
                label="form_password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password.value}
                onChange={(e) => setPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
                errorLabel={password.isValid ? null : 'form_password_error_required'}
              />
              <Box className={classes.icon} onClick={() => setIsPasswordVisible((prevState) => !prevState)}>
                {isPasswordVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </Box>
            </Box>
          </Box>
          <Box className={classes.btn_wrapper}>
            <Button variant="contained" onClick={loginHandler}>
              <FormattedMessage id="app_login" />
            </Button>
            <Typography variant="body1">
              <FormattedMessage id="login_to_register" />
              <a href="/register/customer">
                <FormattedMessage id="login_to_register_action" />
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

Login.propTypes = {
  loginError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginError: selectError,
});

export default connect(mapStateToProps)(Login);
