import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import priceFormatter from '@utils/priceFormatter';
import { selectUserDetail } from '@pages/UserDetail/selectors';
import { getUserDetailRequest } from '@pages/UserDetail/actions';
import CreateAppointmentModal from './components/CreateAppointmentModal';
import { selectCreateConversation, selectHouseDetail } from './selectors';
import { getHouseDetailRequest, postCreateConversationRequest } from './actions';

import classes from './style.module.scss';

const HouseDetail = ({ houseDetail, userDetail, createConversation }) => {
  const { id } = useParams();

  const mapRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToChatHandler = () => {
    dispatch(postCreateConversationRequest({ target_id: houseDetail?.data?.seller_id }));
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getHouseDetailRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (createConversation?.data?.id) navigate(`/conversation/detail/${createConversation?.data?.id}`);
  }, [createConversation?.data?.id, navigate]);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: houseDetail?.data?.location?.coordinates,
      zoom: 13,
    });

    // eslint-disable-next-line no-new
    new window.google.maps.Marker({
      position: houseDetail?.data?.location?.coordinates,
      map,
    });
  }, [houseDetail?.data?.location?.coordinates]);

  useEffect(() => {
    dispatch(getUserDetailRequest(houseDetail?.data?.seller_id));
  }, [dispatch, houseDetail?.data?.seller_id]);

  return (
    <Container className={classes.container}>
      <Box className={classes.container_inner}>
        <Typography variant="h5" className={classes.title}>
          {houseDetail?.data?.title}
        </Typography>
        <Box className={classes.location_wrapper}>
          <LocationOnOutlinedIcon className={classes.icon} />
          <Typography
            variant="body1"
            className={classes.location}
          >{`${houseDetail?.data?.location?.city}, ${houseDetail?.data?.location?.state}, ${houseDetail?.data?.location?.zipCode}`}</Typography>
        </Box>
        <Box className={classes.info_wrapper}>
          <Box className={classes.price_wrapper}>
            <Typography variant="body1" className={classes.price}>
              {priceFormatter.format(houseDetail?.data?.price)}
            </Typography>
          </Box>
          <Box className={classes.seller_wrapper}>
            <Box className={classes.contact_wrapper}>
              <Typography variant="body1">{userDetail?.data?.fullName}</Typography>
              {/* TOOD: Fix Button Position */}
              <Box className={classes.btn_wrapper}>
                <Button variant="outlined" startIcon={<AssignmentTurnedInIcon />} onClick={openModalHandler}>
                  <FormattedMessage id="appointment_request" />
                </Button>
                <Button variant="contained" startIcon={<EmailOutlinedIcon />} onClick={goToChatHandler}>
                  <FormattedMessage id="user_send_message" />
                </Button>
              </Box>
            </Box>
            <Avatar
              src={userDetail?.data?.image_url}
              alt={userDetail?.data?.fullName}
              className={classes.profile_image}
            />
          </Box>
        </Box>
        <Box className={classes.image_wrapper}>
          {houseDetail?.data?.images?.map((image) => (
            <img
              key={image?.image_id}
              src={image?.image_url}
              className={classes.image}
              alt={houseDetail?.data?.title}
            />
          ))}
        </Box>
        <Typography variant="h5" className={classes.list_header}>
          <FormattedMessage id="house_description" />
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {houseDetail?.data?.description}
        </Typography>
        <Typography variant="h5" className={classes.list_header}>
          <FormattedMessage id="house_facility" />
        </Typography>
        <Box className={classes.facility_wrapper}>
          <Box className={classes.facility_wrapper_inner}>
            <ShowerOutlinedIcon className={classes.info_icon} color="primary" />
            <Typography variant="body1">
              {houseDetail?.data?.bathrooms} <FormattedMessage id="house_baths" />
            </Typography>
          </Box>
          <Box className={classes.facility_wrapper_inner}>
            <BedOutlinedIcon className={classes.info_icon} color="primary" />
            <Typography variant="body1">
              {houseDetail?.data?.bedrooms} <FormattedMessage id="house_beds" />
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" className={classes.list_header}>
          <FormattedMessage id="house_address" />
        </Typography>
        <Typography variant="body1" className={classes.address}>
          {houseDetail?.data?.location?.address}
        </Typography>
        <div ref={mapRef} className={classes.maps} />
      </Box>

      <CreateAppointmentModal isOpen={isModalOpen} onClose={closeModalHandler} />
    </Container>
  );
};

HouseDetail.propTypes = {
  houseDetail: PropTypes.object,
  userDetail: PropTypes.object,
  createConversation: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  houseDetail: selectHouseDetail,
  userDetail: selectUserDetail,
  createConversation: selectCreateConversation,
});

export default connect(mapStateToProps)(HouseDetail);
