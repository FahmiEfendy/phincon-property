import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import sensorEmail from '@utils/sensorEmail';
import { hidePopup, showPopup } from '@containers/App/actions';
import { selectDeleteUser, selectUserList } from './selectors';
import { deleteUserRequest, getUserListRequest } from './actions';

import classes from './style.module.scss';

const UserList = ({ userList, deleteUser }) => {
  const dispatch = useDispatch();

  const deleteUserHandler = (id) => {
    dispatch(
      showPopup('user_delete_title', 'user_delete_desc', 'global_delete', () => {
        dispatch(
          deleteUserRequest(id, () => {
            dispatch(showPopup('global_success', 'user_delete_success'));
            dispatch(getUserListRequest());
          })
        );
      })
    );
  };

  useEffect(() => {
    dispatch(getUserListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deleteUser.error !== null) {
      dispatch(hidePopup());
      dispatch(showPopup('app_popup_error_title', 'app_popup_error_message'));
    }
  }, [deleteUser.error, dispatch]);

  return (
    <Container maxWidth="false" className={classes.container}>
      <TableContainer component={Paper} className={classes.table_container}>
        <Typography variant="h5" className={classes.header}>
          <FormattedMessage id="user_list" />
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.table_column}>
                <FormattedMessage id="user_picture" />
              </TableCell>
              <TableCell className={classes.table_column}>
                <FormattedMessage id="form_email" />
              </TableCell>
              <TableCell className={classes.table_column}>
                <FormattedMessage id="form_full_name" />
              </TableCell>
              <TableCell className={classes.table_column}>
                <FormattedMessage id="user_role" />
              </TableCell>
              <TableCell className={classes.table_column}>
                <FormattedMessage id="global_action" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.data?.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell className={classes.table_column}>
                  <Avatar src={row.image_url || ''} className={classes.avatar} />
                </TableCell>
                <TableCell className={classes.table_column}>{row.fullName}</TableCell>
                <TableCell className={classes.table_column}>{sensorEmail(row.email)}</TableCell>
                <TableCell className={classes.table_column}>{row.role}</TableCell>
                <TableCell className={classes.table_column}>
                  <IconButton
                    onClick={() => {
                      deleteUserHandler(row.id);
                    }}
                  >
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

UserList.propTypes = {
  userList: PropTypes.object,
  deleteUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userList: selectUserList,
  deleteUser: selectDeleteUser,
});

export default connect(mapStateToProps)(UserList);
