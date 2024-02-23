import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Box, FormLabel, TextField } from '@mui/material';

import classes from './style.module.scss';

const CustomInput = ({ label, value, onChange, errorLabel, type = 'text' }) => (
  <Box className={classes.input_wrapper}>
    <FormLabel className={classes.form_label}>
      <FormattedMessage id={label} />
    </FormLabel>
    {/* TODO: Add Placeholder */}
    <TextField type={type} value={value} onChange={onChange} />
    {errorLabel && (
      <FormLabel className={classes.form_label_error}>
        <FormattedMessage id={errorLabel} />
      </FormLabel>
    )}
  </Box>
);

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorLabel: PropTypes.string,
  type: PropTypes.string,
};

export default CustomInput;
