/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Container, Tab, Tabs, Typography } from '@mui/material';

import { selectuserData } from '@containers/Client/selectors';
import Security from './components/Security';
import { selectUserDetail } from './selectors';
import { getUserDetailRequest } from './actions';
import Information from './components/Information';
import CustomTabPanel from './components/CustomTabPanel';

import classes from './style.module.scss';

const UserDetail = ({ userData, userDetail }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  useEffect(() => {
    dispatch(getUserDetailRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userDetail?.data?.id && userData?.id === userDetail?.data?.id) {
      navigate(`/user/detail/${userData?.id}`);
    } else if (userDetail?.data?.id && userData?.id !== userDetail?.data?.id) {
      navigate('/forbidden');
    }
  }, [navigate, userData?.id, userDetail?.data?.id]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      {userDetail?.data?.id ? (
        <Box className={classes.container_inner}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<FormattedMessage id="user_information" />} {...a11yProps(0)} />
              <Tab label={<FormattedMessage id="user_security" />} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Information />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Security />
          </CustomTabPanel>
        </Box>
      ) : (
        <Typography variant="h5" className={classes.not_found}>
          <FormattedMessage id="user_not_found" />
          {id}
        </Typography>
      )}
    </Container>
  );
};

UserDetail.propTypes = {
  userDetail: PropTypes.object,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userDetail: selectUserDetail,
  userData: selectuserData,
});

export default connect(mapStateToProps)(UserDetail);
