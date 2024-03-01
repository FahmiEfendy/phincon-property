import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

import encryptPayload from '@utils/encryptPayload';
import { hidePopup, showPopup } from '@containers/App/actions';
import { selectChangePassword } from '@pages/UserDetail/selectors';
import { patchChangePasswordRequest, patchChangePasswordReset } from '@pages/UserDetail/actions';

import classes from './style.module.scss';

const Security = ({ changePassword }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [isOnEditPassword, setIsOnEditPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState({ value: '', isValid: true });
  const [newPassword, setNewPassword] = useState({ value: '', isValid: true });
  const [confirmNewPassword, setConfirmNewPassword] = useState({ value: '', isValid: true });

  const formValidation = () => {
    let isFormValid = true;

    if (oldPassword.value === '') {
      setOldPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (newPassword.value === '') {
      setNewPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (confirmNewPassword.value === '') {
      setConfirmNewPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }

    return isFormValid;
  };

  const changePasswordHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      oldPassword: encryptPayload(oldPassword.value),
      newPassword: encryptPayload(newPassword.value),
      confirmNewPassword: encryptPayload(confirmNewPassword.value),
    };

    dispatch(
      patchChangePasswordRequest({ id, payload }, () => {
        setIsOnEditPassword(false);
        dispatch(showPopup('global_success', 'user_change_password_success'));
      })
    );
  };

  useEffect(() => {
    if (changePassword?.error !== null) {
      dispatch(
        showPopup('app_popup_error_title', changePassword?.error, null, null, () => {
          dispatch(patchChangePasswordReset());
          dispatch(hidePopup());
        })
      );
    }
  }, [changePassword?.error, dispatch]);

  return (
    <Box className={classes.container}>
      {isOnEditPassword ? (
        <>
          <Box className={classes.input_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_old_password" />
            </FormLabel>
            <Box className={classes.input_wrapper_password}>
              <TextField
                fullWidth
                type="password"
                value={oldPassword.value}
                onChange={(e) => setOldPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
              />
            </Box>
            {!oldPassword.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_old_password_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.input_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_new_password" />
            </FormLabel>
            <Box className={classes.input_wrapper_password}>
              <TextField
                fullWidth
                type="password"
                value={newPassword.value}
                onChange={(e) => setNewPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
              />
            </Box>
            {!newPassword.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_new_password_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.input_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="form_confirm_new_password" />
            </FormLabel>
            <Box className={classes.input_wrapper_password}>
              <TextField
                fullWidth
                type="password"
                value={confirmNewPassword.value}
                onChange={(e) => setConfirmNewPassword({ value: e.target.value, isValid: e.target.value.length > 0 })}
              />
            </Box>
            {!confirmNewPassword.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="form_confirm_new_password_error_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.btn_wrapper}>
            <Button variant="outlined" onClick={() => setIsOnEditPassword(false)} className={classes.button}>
              <FormattedMessage id="global_cancel" />
            </Button>
            <Button variant="contained" className={classes.button} onClick={changePasswordHandler}>
              <FormattedMessage id="global_save" />
            </Button>
          </Box>
        </>
      ) : (
        <Box className={classes.password_wrapper}>
          <Typography className={classes.form_header}>Password</Typography>
          <Typography component="span" variant="body1">
            ****************
          </Typography>
          <Button variant="contained" onClick={() => setIsOnEditPassword(true)} className={classes.save_btn}>
            <FormattedMessage id="user_change_password" />
          </Button>
        </Box>
      )}
    </Box>
  );
};

Security.propTypes = {
  changePassword: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  changePassword: selectChangePassword,
});

export default connect(mapStateToProps)(Security);
