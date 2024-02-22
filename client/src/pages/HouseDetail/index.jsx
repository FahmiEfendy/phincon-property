import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectHouseDetail } from './selectors';
import { getHouseDetailRequest } from './actions';

import classes from './style.module.scss';

const HouseDetail = ({ houseDetail }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHouseDetailRequest(id));
  }, [dispatch, id]);

  return <p>{houseDetail?.data.title}</p>;
};

HouseDetail.propTypes = {
  houseDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  houseDetail: selectHouseDetail,
});

export default connect(mapStateToProps)(HouseDetail);
