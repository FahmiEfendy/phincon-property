import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import { selectuserData } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Home = ({ userData }) => {
  const navigate = useNavigate();

  const [city, setCity] = useState('');

  return (
    <Container maxWidth={false} className={classes.container}>
      <Box className={classes.one}>
        <Box className={classes.left_wrapper}>
          <Box className={classes.background_image} />
        </Box>
        <Box className={classes.right_wrapper}>
          <Typography className={classes.header}>
            <FormattedMessage id={userData?.role === 'seller' ? 'home_header_seller' : 'home_header'} />
          </Typography>
          <Typography className={classes.sub_header}>
            <FormattedMessage id={userData?.role === 'seller' ? 'home_sub_header_seller' : 'home_sub_header'} />
          </Typography>
          {userData?.role === 'seller' ? (
            <Button variant="contained" onClick={() => navigate('/house/create')}>
              <FormattedMessage id="house_create" />
            </Button>
          ) : (
            <Button variant="contained" onClick={() => navigate('/house/list')}>
              <FormattedMessage id="house_browse" />
            </Button>
          )}
        </Box>
      </Box>
      <Box className={classes.two}>
        <Box className={classes.content}>
          <Box className={classes.content_inner}>
            <Typography className={classes.header}>
              <FormattedMessage id="home_header_2" />
            </Typography>
            <Typography className={classes.sub_header}>
              <FormattedMessage id="home_sub_header_2" />
            </Typography>
            <Box className={classes.search}>
              <CustomInput
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
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
              <IconButton className={classes.btn_wrapper} onClick={() => navigate(`/house/list?city=${city}`)}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className={classes.backdrop} />
      </Box>
    </Container>
  );
};

Home.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: selectuserData,
});

export default connect(mapStateToProps)(Home);
