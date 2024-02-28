/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Container, Typography } from '@mui/material';

import { selectuserData } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import { selectAppointmentList, selectUpdateAppointment } from './selectors';
import { getAppointmentListRequest, patchUpdateAppointmentRequest } from './actions';

import classes from './style.module.scss';

const AppointmentList = ({ appointmentList, userData, updateAppointment }) => {
  const dispatch = useDispatch();

  const updateAppointmentHandler = (id, status) => {
    dispatch(
      patchUpdateAppointmentRequest({ id, payload: { status } }, () => {
        dispatch(getAppointmentListRequest());
      })
    );
  };

  useEffect(() => {
    dispatch(getAppointmentListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (updateAppointment?.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [dispatch, updateAppointment?.error]);

  return (
    <Container className={classes.container}>
      {appointmentList?.data?.map((data) => {
        const formattedDate = new Date(data?.date);
        const day = formattedDate.toLocaleDateString('en-US', { day: 'numeric' });
        const month = formattedDate.toLocaleDateString('en-US', { month: 'short' });
        return (
          <Box key={data.id} className={classes.wrapper}>
            <Box className={classes.info_wrapper}>
              <Box className={classes.date_wrapper}>
                <Typography variant="body1">{day}</Typography>
                <Typography variant="body1">{month}</Typography>
              </Box>
              <img src={data.house.images[0].image_url} alt={data.house.title} />
              <Box className={classes.title_wrapper}>
                <Typography variant="body1" className={classes.title}>
                  {data.house.title}
                </Typography>
                <Typography variant="body1" className={classes.location}>
                  {data.house.location.address}
                </Typography>
                <Box className={classes.message_wrapper}>
                  <Typography variant="body1" className={classes.message}>
                    <FormattedMessage id="message" />: {data.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.status_wrapper}>
              {userData?.role === 'seller' ? (
                data.status === 'pending' ? (
                  <Box className={classes.btn_wrapper}>
                    <Button variant="contained" onClick={() => updateAppointmentHandler(data.id, 'accepted')}>
                      <FormattedMessage id="global_accept" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateAppointmentHandler(data.id, 'rejected')}
                    >
                      <FormattedMessage id="global_reject" />
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body1" className={classes.status} color={data.status === 'rejected' && 'error'}>
                    {data?.status}
                  </Typography>
                )
              ) : (
                <Typography variant="body1" className={classes.status}>
                  {data?.status}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};

AppointmentList.propTypes = {
  appointmentList: PropTypes.object,
  userData: PropTypes.object,
  updateAppointment: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  appointmentList: selectAppointmentList,
  userData: selectuserData,
  updateAppointment: selectUpdateAppointment,
});

export default connect(mapStateToProps)(AppointmentList);
