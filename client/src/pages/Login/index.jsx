import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, FormLabel, TextField, Typography } from '@mui/material';

import encryptPayload from '@utils/encryptPayload';
import { selectError } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import { postLoginRequest, resetLogin } from '@containers/Client/actions';

import classes from './style.module.scss';

const Login = ({ loginError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: Change Default Value to Empty String Later
  const [email, setEmail] = useState({ value: 'fahmi_customer@gmail.com', isValid: true });
  const [password, setPassword] = useState({ value: 'fahmi123', isValid: true });
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
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_email" />
            </FormLabel>
            <TextField
              type="text"
              value={email.value}
              onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.length > 0 })}
            />
            {!email.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_email_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.input_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_password" />
            </FormLabel>
            <Box className={classes.input_wrapper_password}>
              <TextField
                fullWidth
                type={isPasswordVisible ? 'text' : 'password'}
                value={password.value}
                onChange={(e) => setPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
              />
              <Box className={classes.icon} onClick={() => setIsPasswordVisible((prevState) => !prevState)}>
                {isPasswordVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </Box>
            </Box>
            {!password.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_password_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.btn_wrapper}>
            <Button variant="contained" onClick={loginHandler}>
              <FormattedMessage id="app_login" />
            </Button>
            <Typography variant="body1">
              <FormattedMessage id="login_to_register" />
              <a href="/register/user">
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
