import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

import { formReset } from '@pages/HouseForm/actions';
import { selectuserData } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import HouseItem from '../../components/HouseItem';
import { selectDeleteHouse, selectHouseList } from './selectors';
import { deleteHouseReset, getHouseListRequest } from './actions';

import classes from './style.module.scss';

const HouseList = ({ houseList, deleteHouse, userData }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === 'all') {
      // List all house
      dispatch(getHouseListRequest({ user_id: userData.id }));
    } else if (id !== 'all') {
      // House added by seller
      dispatch(getHouseListRequest({ seller_id: id }));
    }
    dispatch(formReset());
  }, [dispatch, id, userData?.id]);

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
          {userData.role === 'seller' && (
            <Button variant="contained" onClick={() => navigate('/house/create')} className={classes.btn}>
              <FormattedMessage id="house_create" />
            </Button>
          )}
          <Box className={classes.list}>
            {houseList?.data?.map((data) => (
              <React.Fragment key={data.id}>
                {/* TODO: Pagination */}
                <HouseItem data={data} />
              </React.Fragment>
            ))}
          </Box>
        </>
      ) : (
        <Box className={classes.empty_wrapper}>
          <Typography className={classes.listing_empty}>
            <FormattedMessage id="listing_empty" />
          </Typography>
          <Button variant="contained" className={classes.create_btn} onClick={() => navigate('/house/create')}>
            <FormattedMessage id="house_create" />
          </Button>
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
