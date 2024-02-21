import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, FormLabel, TextField, Typography } from '@mui/material';

import encryptPayload from '@utils/encryptPayload';
import { showPopup } from '@containers/App/actions';
import { selectRegister } from './selectors';
import { postRegisterRequest } from './actions';

import classes from './style.module.scss';

const Register = ({ register }) => {
  const { role } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: Change Default Value to Empty String Later
  const [email, setEmail] = useState({ value: 'fahmi_customer@gmail.com', isValid: true });
  const [fullName, setFullName] = useState({ value: 'Fahmi Customer', isValid: true });
  const [password, setPassword] = useState({ value: 'fahmi123', isValid: true });
  const [confirmPassword, setConfirmPassword] = useState({ value: 'fahmi123', isValid: true });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formValidation = () => {
    let isFormValid = true;

    if (email.value === '') {
      setEmail((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (fullName.value === '') {
      setPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (password.value === '') {
      setPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (confirmPassword.value === '') {
      setPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }

    return isFormValid;
  };

  const registerHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      email: encryptPayload(email.value),
      fullName: encryptPayload(fullName.value),
      password: encryptPayload(password.value),
      confirmPassword: encryptPayload(confirmPassword.value),
      role,
    };

    dispatch(postRegisterRequest(payload, () => navigate('/login')));

    if (register.error !== null) {
      dispatch(showPopup('global_error', 'login_invalid'));
    }
  };

  return (
    <Container className={classes.container}>
      <Container className={classes.container_inner}>
        <Box className={classes.wrapper_left} />
        <Box className={classes.wrapper_right}>
          <Typography variant="h5">
            {role === 'customer' ? (
              <FormattedMessage id="register_customer" />
            ) : (
              <FormattedMessage id="register_seller" />
            )}
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
              <FormattedMessage id="form_full_name" />
            </FormLabel>
            <TextField
              type="text"
              value={fullName.value}
              onChange={(e) => setFullName({ value: e.target.value, isValid: e.target.value.length > 0 })}
            />
            {!fullName.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_full_name_error_required" />
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
          <Box className={classes.input_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_confirm_password" />
            </FormLabel>
            <Box className={classes.input_wrapper_password}>
              <TextField
                fullWidth
                type={isPasswordVisible ? 'text' : 'password'}
                value={confirmPassword.value}
                onChange={(e) => setConfirmPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
              />
              <Box className={classes.icon} onClick={() => setIsPasswordVisible((prevState) => !prevState)}>
                {isPasswordVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </Box>
            </Box>
            {!confirmPassword.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_confirm_password_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.btn_wrapper}>
            <Button variant="contained" onClick={registerHandler}>
              <FormattedMessage id="app_register" />
            </Button>
            {role === 'customer' ? (
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/register/seller');
                }}
              >
                <FormattedMessage id="register_seller" />
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/register/customer');
                }}
              >
                <FormattedMessage id="register_customer" />
              </Button>
            )}
            <Typography variant="body1">
              <FormattedMessage id="register_to_login" />
              <a href="/login">
                <FormattedMessage id="app_login" />
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  register: selectRegister,
});

export default connect(mapStateToProps)(Register);
