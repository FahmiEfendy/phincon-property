import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import classes from './style.module.scss';

const Home = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  return (
    // TODO: Difference between Customer and Seller Homepage
    <Container maxWidth={false} className={classes.container}>
      <Box className={classes.one}>
        <Box className={classes.left_wrapper}>
          <Box className={classes.background_image} />
        </Box>
        <Box className={classes.right_wrapper}>
          <Typography className={classes.header}>
            <FormattedMessage id="home_header" />
          </Typography>
          <Typography className={classes.sub_header}>
            <FormattedMessage id="home_sub_header" />
          </Typography>
          {/* TODO: Navigate to Create House if Login as Seller */}
          <Button variant="contained" onClick={() => navigate('/house/list/all')}>
            <FormattedMessage id="house_browse" />
          </Button>
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
            {/* TODO: Search Functionality */}
            <Box className={classes.search}>
              <TextField
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({ id: 'home_location' })}
                className={classes.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton className={classes.btn_wrapper}>
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

export default Home;
