import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Box, Container, Tab, Tabs } from '@mui/material';

import Security from './components/Security';
import { getUserDetailRequest } from './actions';
import Information from './components/Information';
import CustomTabPanel from './components/CustomTabPanel';

import classes from './style.module.scss';

const UserDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

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

  return (
    <Container maxWidth="xl" className={classes.container}>
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
    </Container>
  );
};

export default UserDetail;
