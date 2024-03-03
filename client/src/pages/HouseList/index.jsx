/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import { formReset } from '@pages/HouseForm/actions';
import { selectuserData } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import HouseItem from '../../components/HouseItem';
import { selectDeleteHouse, selectHouseList } from './selectors';
import { deleteHouseReset, getHouseListRequest } from './actions';

import classes from './style.module.scss';

const HouseList = ({ houseList, deleteHouse, userData }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const city = query.get('city');
  const sellerId = query.get('sellerId');

  const [enteredCity, setEnteredCity] = useState('');

  const searchHandler = () => {
    navigate(`/house/list?city=${enteredCity}`);
    setEnteredCity('');
  };

  useEffect(() => {
    if (city) {
      dispatch(getHouseListRequest({ city }));
    } else if (sellerId) {
      dispatch(getHouseListRequest({ seller_id: sellerId }));
    } else {
      dispatch(getHouseListRequest({ user_id: userData.id }));
    }

    dispatch(formReset());
  }, [city, dispatch, sellerId, userData.id]);

  useEffect(() => {
    if (deleteHouse?.error !== null) {
      dispatch(
        showPopup('app_popup_error_title', deleteHouse?.error, null, null, () => {
          dispatch(deleteHouseReset());
          dispatch(hidePopup());
        })
      );
    }
  }, [deleteHouse.error, dispatch]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      {houseList?.data?.length > 0 ? (
        <>
          <Box className={classes.search}>
            <CustomInput
              fullWidth
              value={enteredCity}
              onChange={(e) => setEnteredCity(e.target.value)}
              placeholder="home_location"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              className={classes.input}
            />
            <IconButton className={classes.btn_wrapper} onClick={searchHandler}>
              <SearchIcon />
            </IconButton>
          </Box>
          {userData.role === 'seller' && (
            <Button variant="contained" onClick={() => navigate('/house/create')} className={classes.btn}>
              <FormattedMessage id="house_create" />
            </Button>
          )}
          <Box className={classes.list}>
            {houseList?.data?.data?.map((data) => (
              <React.Fragment key={data.id}>
                {/* TODO: Pagination */}
                <HouseItem data={data} />
              </React.Fragment>
            ))}
          </Box>
        </>
      ) : city ? (
        <Box className={classes.empty_wrapper}>
          <Typography className={classes.result_empty}>
            <FormattedMessage id="house_by_city_empty" />
            {city}
          </Typography>
          <Button variant="contained" className={classes.create_btn} onClick={() => navigate('/house/list')}>
            <FormattedMessage id="house_browse" />
          </Button>
        </Box>
      ) : sellerId ? (
        userData?.role === 'seller' ? (
          <Box className={classes.empty_wrapper}>
            <Typography className={classes.listing_empty}>
              <FormattedMessage id="listing_empty" />
            </Typography>
            <Button variant="contained" className={classes.create_btn} onClick={() => navigate('/house/create')}>
              <FormattedMessage id="house_create" />
            </Button>
          </Box>
        ) : (
          <Box className={classes.empty_wrapper}>
            <Typography className={classes.result_empty}>
              <FormattedMessage id="house_by_seller_empty" />
              {sellerId}
            </Typography>
            <Button variant="contained" className={classes.create_btn} onClick={() => navigate('/house/list')}>
              <FormattedMessage id="house_browse" />
            </Button>
          </Box>
        )
      ) : (
        <Box className={classes.empty_wrapper}>
          <Typography className={classes.listing_empty}>
            <FormattedMessage id="house_empty" />
          </Typography>
          {userData?.role === 'seller' && (
            <Button variant="contained" className={classes.create_btn} onClick={() => navigate('/house/create')}>
              <FormattedMessage id="house_create" />
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

HouseList.propTypes = {
  houseList: PropTypes.object,
  deleteHouse: PropTypes.object,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  houseList: selectHouseList,
  deleteHouse: selectDeleteHouse,
  userData: selectuserData,
});

export default connect(mapStateToProps)(HouseList);
