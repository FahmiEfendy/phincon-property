import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { resetLogin } from '@containers/Client/actions';
import { setLocale, setTheme } from '@containers/App/actions';
import { selectLogin, selectuserData } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Navbar = ({ title, locale, theme, isLogin, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuPosition, setMenuPosition] = useState(null);
  const [profilePosition, setProfilePosition] = useState(null);

  const open = Boolean(menuPosition);
  const isProfileOpen = Boolean(profilePosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const openProfileHandler = (event) => {
    setProfilePosition(event.currentTarget);
  };

  const closeProfileHandler = () => {
    setProfilePosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const logoutHandler = () => {
    dispatch(resetLogin());
  };

  return (
    // TODO: Navbar Responsiveness
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div>
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
        {isLogin ? (
          <>
            <Box className={classes.profile_wrapper} onClick={openProfileHandler}>
              <Avatar className={classes.avatar} src="" />
              <Typography variant="body1">{userData?.fullName}</Typography>
              {/* <ExpandMoreIcon /> */}
            </Box>
            <Menu
              open={isProfileOpen}
              anchorEl={profilePosition}
              onClose={closeProfileHandler}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/user/detail/${userData?.id}`);
                  closeProfileHandler();
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_my_profile" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/favorite/list');
                  closeProfileHandler();
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_favorite" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/appointment/list');
                  closeProfileHandler();
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_appointment" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/conversation/list');
                  closeProfileHandler();
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_conversation" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="global_logout" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box className={classes.btn_wrapper}>
            <Button variant="outlined" onClick={() => navigate('/register/user')}>
              <FormattedMessage id="app_register" />
            </Button>
            <Button variant="contained" onClick={() => navigate('/login')}>
              <FormattedMessage id="app_login" />
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  isLogin: PropTypes.bool,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
  userData: selectuserData,
});

export default connect(mapStateToProps)(Navbar);
