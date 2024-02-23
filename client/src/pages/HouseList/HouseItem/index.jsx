/* eslint-disable camelcase */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import priceFormatter from '@utils/priceFormatter';
import { showPopup } from '@containers/App/actions';
import { deleteHouseRequest, getHouseListRequest } from '../actions';

import classes from './style.module.scss';

const HouseItem = ({ data }) => {
  const { id, title, location, price, bathrooms, bedrooms, images } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuPosition, setMenuPosition] = useState(null);

  const isOpen = Boolean(menuPosition);

  const openMenuHandler = (e) => {
    setMenuPosition(e.currentTarget);
  };

  const closeMenuHandler = () => {
    setMenuPosition(null);
  };
  const deleteHouseHandler = () => {
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

  return (
    <Container className={classes.container}>
      <Box className={classes.container_inner}>
        <Box className={classes.wrapper_left} sx={{ backgroundImage: `url(${images[0]?.image_url})` }} />
        <Box className={classes.wrapper_right}>
          <Typography variant="body1" className={classes.title}>
            {title}
          </Typography>
          <Box className={classes.location_wrapper}>
            <LocationOnOutlinedIcon className={classes.icon} />
            <Typography
              variant="body1"
              className={classes.location}
            >{`${location?.city}, ${location?.state}`}</Typography>
          </Box>
          <Box className={classes.info_wrapper}>
            <Box>
              <Box className={classes.info_wrapper_inner}>
                <ShowerOutlinedIcon className={classes.info_icon} color="primary" />
                <Typography variant="body1">
                  {bathrooms} <FormattedMessage id="house_baths" />
                </Typography>
              </Box>
              <Box className={classes.info_wrapper_inner}>
                <BedOutlinedIcon className={classes.info_icon} color="primary" />
                <Typography variant="body1">
                  {bedrooms} <FormattedMessage id="house_beds" />
                </Typography>
              </Box>
            </Box>
            <Box className={classes.action}>
              <Typography variant="body1" className={classes.price}>
                {priceFormatter.format(price)}
              </Typography>
              <IconButton className={classes.action_btn_wrapper} onClick={() => navigate(`/house/detail/${id}`)}>
                <ArrowForwardOutlinedIcon className={classes.btn} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className={classes.option}>
          <IconButton onClick={openMenuHandler}>
            <MoreVertOutlinedIcon />
          </IconButton>
          <Menu
            open={isOpen}
            anchorEl={menuPosition}
            onClose={closeMenuHandler}
            className={classes.menu_container}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => navigate(`/house/update/${id}`)}>
              <FormattedMessage id="global_edit" />
            </MenuItem>
            <MenuItem onClick={() => deleteHouseHandler()}>
              <FormattedMessage id="global_delete" />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Container>
  );
};

HouseItem.propTypes = {
  data: PropTypes.object,
};

export default HouseItem;
