import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Dialog } from '@mui/material';

import classes from './style.module.scss';

// eslint-disable-next-line arrow-body-style
const PopupMessage = ({ open, title, message, btnText, btnFunc, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogWrapper }}>
      <div className={classes.title}>
        <FormattedMessage id={title || 'app_popup_error_title'} />
      </div>
      <div className={classes.message}>
        <FormattedMessage id={message || 'app_popup_error_message'} />
      </div>
      <div className={classes.btn_wrapper}>
        <button type="button" onClick={onClose} className={classes.button}>
          <FormattedMessage id="app_popup_close_button_label" />
        </button>
        {btnText !== null && btnFunc !== null && (
          <button type="button" onClick={btnFunc} className={classes.button}>
            <FormattedMessage id={btnText || 'global_proceed'} />
          </button>
        )}
      </div>
    </Dialog>
  );
};

PopupMessage.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  btnText: PropTypes.string,
  btnFunc: PropTypes.func,
  onClose: PropTypes.func,
};

export default PopupMessage;
