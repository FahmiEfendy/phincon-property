import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Container } from '@mui/material';

import { selectuserData } from '@containers/Client/selectors';
import { hidePopup, showPopup } from '@containers/App/actions';
import { getHouseListRequest } from './actions';
import HouseItem from '../../components/HouseItem';
import { selectDeleteHouse, selectHouseList } from './selectors';

import classes from './style.module.scss';

const HouseList = ({ houseList, deleteHouse, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHouseListRequest(userData?.id));
  }, [dispatch, userData?.id]);

  useEffect(() => {
    if (deleteHouse?.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [deleteHouse.error, dispatch]);

  return (
    <Container maxWidth="xl" className={classes.container}>
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
