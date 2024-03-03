import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, Button, Container, Typography } from '@mui/material';

import HouseItem from '@components/HouseItem';
import { selectFavoriteList } from './selectors';
import { getFavoriteListRequest } from './actions';

import classes from './style.module.scss';

const FavoriteList = ({ favoriteList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFavoriteListRequest());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Box className={classes.list_wrapper}>
        {favoriteList?.data?.length > 0 ? (
          <Box className={classes.list}>
            {favoriteList?.data?.map((data) => (
              <Box key={data.id}>
                <HouseItem data={data} onFavorite />
              </Box>
            ))}
          </Box>
        ) : (
          <Box className={classes.list_empty_wrapper}>
            <Typography variant="h5" className={classes.list_empty}>
              <FormattedMessage id="favorite_empty" />
            </Typography>
            <Button variant="contained" onClick={() => navigate('/house/list')}>
              <FormattedMessage id="house_browse" />
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

FavoriteList.propTypes = {
  favoriteList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  favoriteList: selectFavoriteList,
});

export default connect(mapStateToProps)(FavoriteList);
