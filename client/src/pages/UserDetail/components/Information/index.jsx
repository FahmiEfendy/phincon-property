import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from '@mui/material';

import { hidePopup, showPopup } from '@containers/App/actions';
import { selectUpdateUser, selectUserDetail } from '@pages/UserDetail/selectors';
import { getUserDetailRequest, patchUpdateUserRequest } from '@pages/UserDetail/actions';

import classes from './style.module.scss';

const Information = ({ userDetail, updateUser }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState({ value: '' });
  const [email, setEmail] = useState({ value: '', isValid: true });
  const [image, setImage] = useState({ value: '', isValid: true });

  const formValidation = () => {
    let isFormValid = true;

    if (fullName.value === '') {
      setFullName((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    } else if (image.value === '') {
      setImage((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }

    return isFormValid;
  };

  const updateHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = new FormData();

    payload.append('fullName', fullName.value);
    payload.append('image', image.value);

    dispatch(
      patchUpdateUserRequest({ id, payload }, () => {
        dispatch(getUserDetailRequest(id));
        setIsEditing(false);
        dispatch(showPopup('global_success', 'user_profile_update_success'));
      })
    );
  };

  useEffect(() => {
    if (userDetail?.data) {
      setEmail({ value: userDetail?.data?.email, isValid: true });
      setFullName({ value: userDetail?.data?.fullName, isValid: true });
    }
  }, [userDetail?.data]);

  useEffect(() => {
    if (updateUser.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [dispatch, updateUser.error]);

  // TODO: Fix Validation Styling

  return (
    <TableContainer className={classes.table_container}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.form_header}>
              <FormattedMessage id="form_image" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.form_data_image}>
              {(userDetail?.data?.image_url || image.value) && (
                <Avatar
                  src={image.value === '' ? userDetail?.data?.image_url : URL.createObjectURL(image.value)}
                  alt={image.value !== '' ? fullName.value : ''}
                  className={classes.profile_picture}
                />
              )}
              {isEditing && (
                <input
                  type="file"
                  onChange={(e) => {
                    setImage({ value: e.target.files[0], isValid: true });
                  }}
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.form_header}>
              <FormattedMessage id="form_email" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.form_data}>
              {isEditing ? (
                <Box className={classes.input_wrapper}>
                  <TextField
                    fullWidth
                    type="text"
                    disabled
                    value={email.value}
                    onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.length > 0 })}
                  />
                </Box>
              ) : (
                <Typography component="span" variant="body1">
                  {userDetail?.data?.email}
                </Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.form_header}>
              <FormattedMessage id="form_full_name" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.form_data}>
              {isEditing ? (
                <Box className={classes.input_wrapper}>
                  <TextField
                    fullWidth
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
              ) : (
                <>
                  <Typography component="span" variant="body1">
                    {userDetail?.data?.fullName}
                  </Typography>

                  {!fullName.isValid && (
                    <FormLabel className={classes.form_label_error}>
                      <FormattedMessage id="form_full_name_error_required" />
                    </FormLabel>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {isEditing ? (
        <Box className={classes.btn_wrapper}>
          <Button variant="outlined" onClick={() => setIsEditing(false)} className={classes.button}>
            <FormattedMessage id="global_cancel" />
          </Button>
          <Button variant="contained" className={classes.button} onClick={updateHandler}>
            <FormattedMessage id="global_save" />
          </Button>
        </Box>
      ) : (
        <Button variant="contained" onClick={() => setIsEditing(true)} className={classes.edit_btn}>
          <FormattedMessage id="user_edit_profile" />
        </Button>
      )}
    </TableContainer>
  );
};

Information.propTypes = {
  userDetail: PropTypes.object,
  updateUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userDetail: selectUserDetail,
  updateUser: selectUpdateUser,
});

export default connect(mapStateToProps)(Information);
