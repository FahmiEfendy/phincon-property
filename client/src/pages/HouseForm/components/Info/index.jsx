import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import { setFormData, setStep } from '@pages/HouseForm/actions';
import { selectHouseDetail } from '@pages/HouseDetail/selectors';
import { selectFormData, selectStep } from '@pages/HouseForm/selectors';

import classes from './style.module.scss';

const Info = ({ step, formData, houseDetail }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [informationData, setInformationData] = useState({
    title: { value: formData.info.title, isValid: true },
    description: { value: formData.info.description, isValid: true },
    price: { value: formData.info.price, isValid: true },
    bedrooms: { value: formData.info.bedrooms, isValid: true },
    bathrooms: { value: formData.info.bathrooms, isValid: true },
  });

  const inputChangeHandler = (field) => (e) => {
    setInformationData((prevData) => ({
      ...prevData,
      [field]: { value: e.target.value, isValid: e.target.value.length > 0 },
    }));
  };

  const formValidation = () => {
    let isValid = true;

    if (informationData.title.value === '') {
      setInformationData((prevState) => ({
        ...prevState,
        title: {
          ...prevState.title,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (informationData.description.value === '') {
      setInformationData((prevState) => ({
        ...prevState,
        description: {
          ...prevState.description,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (informationData.price.value === 0) {
      setInformationData((prevState) => ({
        ...prevState,
        price: {
          ...prevState.price,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (informationData.bedrooms.value === 0) {
      setInformationData((prevState) => ({
        ...prevState,
        bedrooms: {
          ...prevState.bedrooms,
          isValid: false,
        },
      }));
      isValid = false;
    } else if (informationData.bathrooms.value === 0) {
      setInformationData((prevState) => ({
        ...prevState,
        bathrooms: {
          ...prevState.bathrooms,
          isValid: false,
        },
      }));
      isValid = false;
    }

    return isValid;
  };

  const nextStepHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    const payload = {
      title: informationData.title.value,
      description: informationData.description.value,
      price: informationData.price.value,
      bedrooms: informationData.bedrooms.value,
      bathrooms: informationData.bathrooms.value,
    };

    dispatch(setFormData({ ...formData, info: payload }));
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    if (id && houseDetail?.data) {
      setInformationData(() => ({
        title: { value: houseDetail.data.title, isValid: true },
        description: { value: houseDetail.data.description, isValid: true },
        price: { value: houseDetail.data.price, isValid: true },
        bedrooms: { value: houseDetail.data.bedrooms, isValid: true },
        bathrooms: { value: houseDetail.data.bathrooms, isValid: true },
      }));
    }
  }, [houseDetail.data, id]);

  return (
    <Box className={classes.container}>
      <Typography variant="h5">
        <FormattedMessage id="house_information" />
      </Typography>
      <CustomInput
        label="house_title"
        value={informationData.title.value}
        onChange={inputChangeHandler('title')}
        errorLabel={informationData.title.isValid ? null : 'house_title_required'}
      />
      <CustomInput
        label="house_description"
        value={informationData.description.value}
        onChange={inputChangeHandler('description')}
        errorLabel={informationData.description.isValid ? null : 'house_description_required'}
      />
      <CustomInput
        label="house_price"
        value={informationData.price.value}
        onChange={inputChangeHandler('price')}
        errorLabel={informationData.price.isValid ? null : 'house_price_required'}
        type="number"
      />
      <CustomInput
        label="house_bath_label"
        value={informationData.bedrooms.value}
        onChange={inputChangeHandler('bedrooms')}
        errorLabel={informationData.bedrooms.isValid ? null : 'house_bath_required'}
        type="number"
      />
      <CustomInput
        label="house_bed_label"
        value={informationData.bathrooms.value}
        onChange={inputChangeHandler('bathrooms')}
        errorLabel={informationData.bathrooms.isValid ? null : 'house_bed_required'}
        type="number"
      />
      <Box className={classes.btn_wrapper}>
        <Button variant="contained" className={classes.btn} onClick={nextStepHandler}>
          <FormattedMessage id="global_next" />
        </Button>
      </Box>
    </Box>
  );
};

Info.propTypes = {
  step: PropTypes.number,
  formData: PropTypes.object,
  houseDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  formData: selectFormData,
  houseDetail: selectHouseDetail,
});

export default connect(mapStateToProps)(Info);
