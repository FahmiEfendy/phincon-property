import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Container } from '@mui/material';

import { hidePopup, showPopup } from '@containers/App/actions';
import HouseItem from './HouseItem';
import { getHouseListRequest } from './actions';
import { selectDeleteHouse, selectHouseList } from './selectors';

import classes from './style.module.scss';

const HouseList = ({ houseList, deleteHouse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHouseListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deleteHouse?.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [deleteHouse.error, dispatch]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Button variant="contained" onClick={() => navigate('/house/create')} className={classes.btn}>
        <FormattedMessage id="house_create" />
      </Button>
      <Box className={classes.list}>
        {houseList?.data?.map((data) => (
          <>
            {/* TODO: Pagination */}
            <HouseItem data={data} />
          </>
        ))}
      </Box>
    </Container>
  );
};

HouseList.propTypes = {
  houseList: PropTypes.object,
  deleteHouse: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  houseList: selectHouseList,
  deleteHouse: selectDeleteHouse,
});

export default connect(mapStateToProps)(HouseList);
