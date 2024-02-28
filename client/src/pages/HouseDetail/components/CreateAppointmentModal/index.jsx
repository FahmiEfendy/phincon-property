import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import CustomInput from '@components/CustomInput';
import { hidePopup, showPopup } from '@containers/App/actions';
import { postCreateAppointmentRequest } from '@pages/HouseDetail/actions';
import { selectCreateAppointment, selectHouseDetail } from '@pages/HouseDetail/selectors';

import classes from './style.module.scss';

const CreateAppointmentModal = ({ isOpen, onClose, houseDetail, createAppointment }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [message, setMessage] = useState({ value: '', isValid: true });
  const [date, setDate] = useState({ value: null, isValid: true });

  const formValidation = () => {
    let isValid = true;

    if (message.value === '') {
      setMessage((prevState) => ({ ...prevState, isValid: false }));
      isValid = false;
    } else if (date.value === null) {
      setDate((prevState) => ({ ...prevState, isValid: false }));
      isValid = false;
    }

    return isValid;
  };

  const createAppointmentHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      house_id: id,
      seller_id: houseDetail?.data?.seller_id,
      message: message.value,
      date: new Date(date.value),
    };

    dispatch(
      postCreateAppointmentRequest(payload, () => {
        onClose();
        dispatch(showPopup('global_success', 'appointmnet_create_success'));
      })
    );
  };

  useEffect(() => {
    if (createAppointment?.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [createAppointment.error, dispatch]);

  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.container}>
          <Typography variant="h5" className={classes.header}>
            <FormattedMessage id="appointment_create" />
          </Typography>
          <Box>
            <CustomInput
              label="appointment_message"
              value={message.value}
              onChange={(e) => setMessage({ isValid: e.target.value.length > 0, value: e.target.value })}
              errorLabel={!message.isValid ? 'appointment_message_required' : ''}
            />
          </Box>
          <Box className={classes.date_wrapper}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="appointment_date" />
            </FormLabel>
            <DateTimePicker
              value={date.value}
              onChange={(newValue) => setDate({ isValid: newValue !== '', value: newValue })}
            />
            {!date.isValid && (
              <FormLabel className={classes.form_label_error}>
                <FormattedMessage id="appointment_date_required" />
              </FormLabel>
            )}
          </Box>
          <Box className={classes.btn_wrapper}>
            <Button variant="outlined" onClick={onClose}>
              <FormattedMessage id="global_cancel" />
            </Button>
            <Button variant="contained" onClick={createAppointmentHandler}>
              <FormattedMessage id="global_create" />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

CreateAppointmentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  houseDetail: PropTypes.object,
  createAppointment: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  houseDetail: selectHouseDetail,
  createAppointment: selectCreateAppointment,
});

export default connect(mapStateToProps)(CreateAppointmentModal);
