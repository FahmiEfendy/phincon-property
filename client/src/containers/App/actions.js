import { SET_LOCAL, SET_THEME, SET_POPUP, SET_LOADING, PING } from '@containers/App/constants';

export const setLocale = (locale) => ({
  type: SET_LOCAL,
  locale,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const showPopup = (title = '', message = '', btnText = null, btnFunc = null) => ({
  type: SET_POPUP,
  popup: {
    open: true,
    title,
    message,
    btnText,
    btnFunc,
  },
});

export const hidePopup = () => ({
  type: SET_POPUP,
  popup: {
    open: false,
    title: '',
    message: '',
    btnText: null,
    btnFunc: null,
  },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const ping = () => ({
  type: PING,
});
