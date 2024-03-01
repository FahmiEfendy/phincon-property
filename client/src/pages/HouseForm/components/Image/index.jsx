import _ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { showPopup } from '@containers/App/actions';
import { selectHouseDetail } from '@pages/HouseDetail/selectors';
import { getHouseDetailRequest } from '@pages/HouseDetail/actions';
import { selectFormData, selectStep } from '@pages/HouseForm/selectors';
import { deleteHouseImageRequest, setFormData, setStep } from '@pages/HouseForm/actions';

import classes from './style.module.scss';

const Image = ({ step, formData, houseDetail }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [files, setFiles] = useState({ value: formData.images, isValid: true });

  // TODO: Fix Keep New Inputted Image When Old Image Deleted From Database
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => ({ ...prevState, value: [...prevState.value, ...acceptedFiles] }));
    },
  });

  const deleteImageHandler = (selectedFile) => {
    let filteredImage;

    if (selectedFile.image_url) {
      dispatch(
        showPopup('global_confirmation', 'house_image_delete_desc', 'global_delete', () => {
          dispatch(
            deleteHouseImageRequest({ id, payload: { image_id: selectedFile.image_id } }, () => {
              dispatch(showPopup('global_success', 'house_image_delete_success'));
              dispatch(getHouseDetailRequest(id));
              filteredImage = [...formData.images, houseDetail?.data?.images];
              setFiles((prevState) => ({ ...prevState, value: filteredImage }));
            })
          );
        })
      );
    } else {
      filteredImage = files.value.filter((file) => file.name !== selectedFile.name);
      setFiles((prevState) => ({ ...prevState, value: filteredImage }));
    }
  };

  const formValidation = () => {
    let isValid = true;

    if (_.isEqual(files.value.length, 0)) {
      setFiles((prevState) => ({
        ...prevState,
        isValid: false,
      }));
      isValid = false;
    }

    return isValid;
  };

  const nextStepHandler = () => {
    const isFormValid = formValidation();

    if (!isFormValid) return;

    dispatch(setFormData({ ...formData, images: files.value }));
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    if (id && houseDetail?.data) {
      setFiles(() => ({
        value: _.isEmpty(formData?.images) ? houseDetail?.data?.images : formData?.images,
        isValid: true,
      }));
    }
  }, [formData?.images, houseDetail?.data, id]);

  return (
    <Box className={classes.container}>
      <Box className={classes.dropzone_wrapper}>
        <Typography variant="h5">
          <FormattedMessage id="house_image" />
        </Typography>
        {_.isEmpty(files.value) ? (
          <div {...getRootProps({ className: 'dropzone' })} className={classes.dropzone_wrapper_inner}>
            <input {...getInputProps()} />
            <Typography variant="body1" className={classes.dropzone_text}>
              <FormattedMessage id="dropzone_text" />
            </Typography>
          </div>
        ) : (
          <Box className={classes.image_wrapper}>
            {files.value.map((file, i) => (
              <Box className={classes.img} key={i}>
                <img
                  src={file.image_url ? file.image_url : URL.createObjectURL(file)}
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  alt={file.name}
                />
                <IconButton onClick={() => deleteImageHandler(file)} className={classes.delete_img}>
                  <ClearOutlinedIcon />
                </IconButton>
              </Box>
            ))}
            <Box className={classes.extra_dropzone}>
              <div {...getRootProps({ className: 'dropzone' })} className={classes.extra_dropzone_inner}>
                <input {...getInputProps()} />
                <AddCircleOutlineIcon />
                <Typography variant="body1" className={classes.extra_dropzone_text}>
                  <FormattedMessage id="dropzone_extra_text" />
                </Typography>
              </div>
            </Box>
          </Box>
        )}
      </Box>
      {/* TODO: Button Position */}
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

Image.propTypes = {
  step: PropTypes.number,
  formData: PropTypes.object,
  houseDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  formData: selectFormData,
  houseDetail: selectHouseDetail,
});

export default connect(mapStateToProps)(Image);
