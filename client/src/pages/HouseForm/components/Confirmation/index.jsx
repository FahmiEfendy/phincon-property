import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import { Box, Button, Container, Typography } from '@mui/material';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';

import { showPopup } from '@containers/App/actions';
import { getHouseDetailRequest } from '@pages/HouseDetail/actions';
import { selectFormData, selectStep } from '@pages/HouseForm/selectors';
import { patchUpdateHouseRequest, postCreateHouseRequest, setStep } from '@pages/HouseForm/actions';

import classes from './style.module.scss';

const Confirmation = ({ step, formData }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextStepHandler = () => {
    const payload = new FormData();

    payload.append('title', formData.info.title);
    payload.append('description', formData.info.description);
    payload.append('price', formData.info.price);
    payload.append('address', formData.location.address);
    payload.append('city', formData.location.city);
    payload.append('state', formData.location.state);
    payload.append('zipCode', formData.location.zipCode);
    payload.append('bathrooms', formData.info.bathrooms);
    payload.append('bedrooms', formData.info.bedrooms);

    for (let i = 0; i < formData.images.length; i++) {
      if (!formData.images[i].image_url) {
        payload.append('images', formData.images[i]);
      }
    }

    if (id) {
      dispatch(
        patchUpdateHouseRequest({ id, payload }, () => {
          dispatch(showPopup('global_success', 'house_update_success'));
          dispatch(getHouseDetailRequest(id));
          navigate(`/house/detail/${id}`);
        })
      );
    } else {
      dispatch(
        postCreateHouseRequest(payload, () => {
          dispatch(showPopup('global_success', 'house_create_success'));
          navigate('/house/list');
        })
      );
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        <FormattedMessage id="global_confirmation_page" />
      </Typography>
      <Typography variant="h5" className={classes.list_header}>
        <FormattedMessage id="house_information" />
      </Typography>
      <Box className={classes.list_wrapper}>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_address" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.info.title}
          </Typography>
        </Box>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_description" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.info.description}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.list_wrapper}>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_facility" />
          </Typography>
          <Box className={classes.info_wrapper}>
            <ShowerOutlinedIcon className={classes.info_icon} color="primary" />
            <Typography variant="body1" className={classes.sub_text}>
              {formData.info.bathrooms}
            </Typography>
          </Box>
          <Box className={classes.info_wrapper}>
            <BedOutlinedIcon className={classes.info_icon} color="primary" />
            <Typography variant="body1" className={classes.sub_text}>
              {formData.info.bedrooms}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_price" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.info.price}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" className={classes.list_header}>
        <FormattedMessage id="house_location" />
      </Typography>
      <Box className={classes.list_wrapper}>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_address" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.location.address}
          </Typography>
        </Box>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_city" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.location.city}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.list_wrapper}>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_state" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.location.state}
          </Typography>
        </Box>
        <Box className={classes.list}>
          <Typography variant="body1" className={classes.text}>
            <FormattedMessage id="house_zip_code" />
          </Typography>
          <Typography variant="body1" className={classes.sub_text}>
            {formData.location.zipCode}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" className={classes.list_header}>
        <FormattedMessage id="house_image" />
      </Typography>
      <Box className={classes.image_wrapper}>
        {formData.images.map((file) => (
          <Box className={classes.img}>
            <img
              src={file?.image_url ? file.image_url : URL.createObjectURL(file)}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              alt={file.name}
            />
          </Box>
        ))}
      </Box>
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
          {id ? <FormattedMessage id="global_save" /> : <FormattedMessage id="global_create" />}
        </Button>
      </Box>
    </Container>
  );
};

Confirmation.propTypes = {
  step: PropTypes.number,
  formData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  formData: selectFormData,
});

export default connect(mapStateToProps)(Confirmation);
