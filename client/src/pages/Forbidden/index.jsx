import { FormattedMessage } from 'react-intl';

import { Container, Typography } from '@mui/material';

import classes from './style.module.scss';
import unauthorized from '../../../asset/unauthorized.svg';

const Forbidden = () => (
  <Container className={classes.container}>
    <img src={unauthorized} alt="unauthorized" className={classes.icon} />
    <Typography variant="h5">
      <FormattedMessage id="forbidden_text" />
    </Typography>
  </Container>
);

export default Forbidden;
