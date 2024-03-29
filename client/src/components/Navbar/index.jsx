import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { setLocale } from '@containers/App/actions';
import { resetLogin } from '@containers/Client/actions';
import { selectUserDetail } from '@pages/UserDetail/selectors';
import { getUserDetailRequest } from '@pages/UserDetail/actions';
import { selectLogin, selectuserData } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Navbar = ({ title, locale, isLogin, userData, userDetail }) => {
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
    navigate('/');
  };

  useEffect(() => {
    if (userData?.id) {
      dispatch(getUserDetailRequest(userData?.id));
    }
  }, [dispatch, userData?.id]);

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
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
              <Avatar className={classes.avatar} src={userData?.image_url} />
              <Typography variant="body1">{userData?.fullName}</Typography>
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
              {userData?.role === 'admin' && (
                <MenuItem
                  onClick={() => {
                    navigate('/user/list');
                    closeProfileHandler();
                  }}
                >
                  <div className={classes.menu}>
                    <div className={classes.menuLang}>
                      <FormattedMessage id="app_user_list" />
                    </div>
                  </div>
                </MenuItem>
              )}
              {userData?.role === 'seller' && (
                <MenuItem
                  onClick={() => {
                    navigate(`/house/list?sellerId=${userData?.id}`);
                    closeProfileHandler();
                  }}
                >
                  <div className={classes.menu}>
                    <div className={classes.menuLang}>
                      <FormattedMessage id="app_my_house" />
                    </div>
                  </div>
                </MenuItem>
              )}
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
            <Button variant="outlined" onClick={() => navigate('/register/customer')}>
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
  isLogin: PropTypes.bool,
  userData: PropTypes.object,
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
  userData: selectuserData,
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(Navbar);
