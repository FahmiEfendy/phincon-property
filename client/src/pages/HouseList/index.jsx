/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Button } from '@mui/material';

import { hidePopup, showPopup } from '@containers/App/actions';
import { selectDeleteHouse, selectHouseList } from './selectors';
import { deleteHouseRequest, getHouseListRequest } from './actions';

const HouseList = ({ houseList, deleteHouse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHouseHandler = (id) => {
    dispatch(
      showPopup('global_confirmation', 'house_delete_desc', 'global_delete', () => {
        dispatch(
          deleteHouseRequest(id, () => {
            dispatch(showPopup('global_success', 'house_delete_success'));
            dispatch(getHouseListRequest());
          })
        );
      })
    );
  };

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
    <>
      <Button variant="contained" onClick={() => navigate('/house/create')}>
        <FormattedMessage id="house_create" />
      </Button>
      {houseList?.data?.map((data) => (
        <>
          <p onClick={() => navigate(`/house/detail/${data.id}`)}>{data.title}</p>
          <Button onClick={() => navigate(`/house/update/${data.id}`)}>Edit</Button>
          <Button onClick={() => deleteHouseHandler(data.id)}>Delete</Button>
        </>
      ))}
    </>
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
