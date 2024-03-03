import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, FormLabel, TextField } from '@mui/material';

import classes from './style.module.scss';

const CustomInput = ({
  label = '',
  value,
  onChange,
  errorLabel = '',
  type = 'text',
  placeholder = 'global_type_something',
  onKeyDown = () => {},
  ...params
}) => {
  const intl = useIntl();

  return (
    <Box className={classes.input_wrapper}>
      {label !== '' && (
        <FormLabel className={classes.form_label}>
          <FormattedMessage id={label} />
        </FormLabel>
      )}
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        placeholder={intl.formatMessage({ id: placeholder })}
        onKeyDown={onKeyDown}
        {...params}
      />
      {errorLabel && errorLabel !== '' && (
        <FormLabel className={classes.form_label_error}>
          <FormattedMessage id={errorLabel} />
        </FormLabel>
      )}
    </Box>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  errorLabel: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
  params: PropTypes.object,
};

export default CustomInput;
