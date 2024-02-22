import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

import { showPopup } from '@containers/App/actions';
import { selectHouseDetail } from '@pages/HouseDetail/selectors';
import { getHouseDetailRequest } from '@pages/HouseDetail/actions';
import { selectCreateHouse, selectDeleteHouseImage, selectUpdateHouse } from './selectors';
import { deleteHouseImageRequest, patchUpdateHouseRequest, postCreateHouseRequest } from './actions';

import classes from './style.module.scss';

const HouseForm = ({ createHouse, houseDetail, deleteHouseImage, updateHouse }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState({ value: '', isValid: true });

  const submitHouseHandler = () => {
    const payload = new FormData();

    payload.append('title', 'test title');
    payload.append('description', 'test description');
    payload.append('price', 10000);
    payload.append('address', 'Tower 88 Kota Kasablanka');
    payload.append('city', 'test city');
    payload.append('state', 'test state');
    payload.append('zipCode', 12312);
    payload.append('bathrooms', 5);
    payload.append('bedrooms', 2);
    payload.append('images', image.value);

    if (id) {
      dispatch(
        patchUpdateHouseRequest({ id, payload }, () => {
          dispatch(showPopup('global_success', 'house_update_success'));
          dispatch(getHouseDetailRequest(id));
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

  const deleteHouseImageHandler = (imageId) => {
    dispatch(
      showPopup('global_confirmation', 'house_image_delete_desc', 'global_delete', () => {
        dispatch(
          deleteHouseImageRequest({ id, payload: { image_id: imageId } }, () => {
            dispatch(showPopup('global_success', 'house_image_delete_success'));
            dispatch(getHouseDetailRequest(id));
          })
        );
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getHouseDetailRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (createHouse?.error !== null || deleteHouseImage?.error !== null || updateHouse?.error !== null) {
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [createHouse?.error, deleteHouseImage?.error, dispatch, updateHouse?.error]);

  return (
    <>
      <Typography variant="h5">{houseDetail?.data?.title}</Typography>
      {houseDetail?.data?.images?.map((data) => (
        <>
          <img src={data.image_url} alt={houseDetail?.data?.title} />
          <Button onClick={() => deleteHouseImageHandler(data?.image_id)}>Delete</Button>
        </>
      ))}
      <input
        type="file"
        onChange={(e) => {
          setImage({ value: e.target.files[0], isValid: true });
        }}
      />
      {id ? (
        <Button variant="contained" onClick={submitHouseHandler}>
          <FormattedMessage id="global_edit" />
        </Button>
      ) : (
        <Button variant="contained" onClick={submitHouseHandler}>
          <FormattedMessage id="global_create" />
        </Button>
      )}
    </>
  );
};

HouseForm.propTypes = {
  createHouse: PropTypes.object,
  houseDetail: PropTypes.object,
  updateHouse: PropTypes.object,
  deleteHouseImage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  createHouse: selectCreateHouse,
  houseDetail: selectHouseDetail,
  updateHouse: selectUpdateHouse,
  deleteHouseImage: selectDeleteHouseImage,
});

export default connect(mapStateToProps)(HouseForm);
