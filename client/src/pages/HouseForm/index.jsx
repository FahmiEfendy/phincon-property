import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Container, Typography } from '@mui/material';

import { hidePopup, showPopup } from '@containers/App/actions';
import { getHouseDetailRequest } from '@pages/HouseDetail/actions';
import Info from './components/Info';
import Image from './components/Image';
import Location from './components/Location';
import Confirmation from './components/Confirmation';
import { deleteHouseImageReset, patchUpdateHouseReset, postCreateHouseReset } from './actions';
import { selectCreateHouse, selectDeleteHouseImage, selectStep, selectUpdateHouse } from './selectors';

import classes from './style.module.scss';

const HouseForm = ({ createHouse, deleteHouseImage, updateHouse, step }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const stepArr = [
    {
      step: 1,
      title: 'INFORMATION',
    },
    {
      step: 2,
      title: 'LOCATION',
    },
    {
      step: 3,
      title: 'IMAGE',
    },
    {
      step: 4,
      title: 'CONFIRMATION',
    },
  ];

  const selectedStep = () => {
    if (step === 1) return <Info />;
    if (step === 2) return <Location />;
    if (step === 3) return <Image />;
    if (step === 4) return <Confirmation />;
  };

  useEffect(() => {
    if (id) {
      dispatch(getHouseDetailRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (createHouse?.error !== null) {
      dispatch(
        showPopup('app_popup_error_title', createHouse?.error, null, null, () => {
          dispatch(postCreateHouseReset());
          dispatch(hidePopup());
        })
      );
    } else if (updateHouse?.error !== null) {
      dispatch(
        showPopup('app_popup_error_title', updateHouse?.error, null, null, () => {
          dispatch(patchUpdateHouseReset());
          dispatch(hidePopup());
        })
      );
    } else if (deleteHouseImage?.error !== null) {
      dispatch(
        showPopup('app_popup_error_title', deleteHouseImage?.error, null, null, () => {
          dispatch(deleteHouseImageReset());
          dispatch(hidePopup());
        })
      );
    }
  }, [createHouse?.error, deleteHouseImage?.error, dispatch, updateHouse?.error]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Box className={classes.container_inner}>
        {/* TODO: Wrapper Left Height */}
        <Box className={classes.wrapper_left} sx={{ backgroundImage: `url(../../../asset/house-3.jpg)` }}>
          <Box className={classes.step_wrapper}>
            {stepArr.map((list) => (
              <Box className={classes.step_wrapper_inner} key={list.step}>
                <Box className={list.step <= step ? classes.step_item_active : classes.step_item}>
                  <Box className={classes.step_number_wrapper}>
                    <Typography variant="body1" className={classes.step}>
                      {list.step}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" className={classes.title}>
                  {list.title}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box className={classes.backdrop} />
        </Box>
        <Box className={classes.wrapper_right}>{selectedStep()}</Box>
      </Box>
    </Container>
  );
};

HouseForm.propTypes = {
  createHouse: PropTypes.object,
  updateHouse: PropTypes.object,
  deleteHouseImage: PropTypes.object,
  step: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  createHouse: selectCreateHouse,
  updateHouse: selectUpdateHouse,
  deleteHouseImage: selectDeleteHouseImage,
  step: selectStep,
});

export default connect(mapStateToProps)(HouseForm);
