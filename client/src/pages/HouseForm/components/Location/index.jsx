import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import { setFormData, setStep } from '@pages/HouseForm/actions';
import { selectFormData, selectStep } from '@pages/HouseForm/selectors';

import classes from './style.module.scss';

const Location = ({ step, formData }) => {
  const dispatch = useDispatch();

  const [locationData, setLocationData] = useState({
    address: { value: '', isValid: true },
    city: { value: '', isValid: true },
    state: { value: '', isValid: true },
    zipCode: { value: 0, isValid: true },
  });

  const formValidation = () => {
    let isValid = true;

    if (locationData.address.value === '') {
      setLocationData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (locationData.city.value === '') {
      setLocationData((prevState) => ({
        ...prevState,
        city: {
          ...prevState.city,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (locationData.state.value === '') {
      setLocationData((prevState) => ({
        ...prevState,
        state: {
          ...prevState.state,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (locationData.zipCode.value === '') {
      setLocationData((prevState) => ({
        ...prevState,
        zipCode: {
          ...prevState.zipCode,
          isValid: false,
        },
      }));
      isValid = false;
    }

    return isValid;
  };

  const inputChangeHandler = (field) => (e) => {
    setLocationData((prevData) => ({
      ...prevData,
      [field]: { value: e.target.value, isValid: e.target.value.length > 0 },
    }));
  };

  const nextStepHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      address: locationData.address.value,
      city: locationData.city.value,
      state: locationData.state.value,
      zipCode: locationData.zipCode.value,
    };

    dispatch(setFormData({ ...formData, location: payload }));

    dispatch(setStep(step + 1));
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h5">
        <FormattedMessage id="house_location" />
      </Typography>
      <CustomInput
        label="house_address"
        value={locationData.address.value}
        onChange={inputChangeHandler('address')}
        errorLabel={locationData.address.isValid ? null : 'house_address_required'}
      />
      <CustomInput
        label="house_city"
        value={locationData.city.value}
        onChange={inputChangeHandler('city')}
        errorLabel={locationData.city.isValid ? null : 'house_city_required'}
      />
      <CustomInput
        label="house_state"
        value={locationData.state.value}
        onChange={inputChangeHandler('state')}
        errorLabel={locationData.state.isValid ? null : 'house_state_required'}
      />
      <CustomInput
        label="house_zip_code"
        value={locationData.zipCode.value}
        onChange={inputChangeHandler('zipCode')}
        errorLabel={locationData.zipCode.isValid ? null : 'house_zip_code_required'}
        type="number"
      />
      <Box className={classes.btn_wrapper}>
        <Button
          variant="outlined"
          className={classes.btn_back}
          onClick={() => {
            dispatch(setStep(step - 1));
          }}
        >
          <FormattedMessage id="global_back" />
        </Button>
        <Button variant="contained" className={classes.btn_next} onClick={nextStepHandler}>
          <FormattedMessage id="global_next" />
        </Button>
      </Box>
    </Box>
  );
};

Location.propTypes = {
  step: PropTypes.number,
  formData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  formData: selectFormData,
});

export default connect(mapStateToProps)(Location);
