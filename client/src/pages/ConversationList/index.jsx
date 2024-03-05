/* eslint-disable no-unsafe-optional-chaining */
import _ from 'lodash';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Container, IconButton, Typography } from '@mui/material';

import CustomInput from '@components/CustomInput';
import { selectuserData } from '@containers/Client/selectors';
import { selectConversationDetail, selectConversationList } from './selectors';
import { getConversationDetailRequest, getConversationListRequest, postSendMessageRequest } from './actions';

import classes from './style.module.scss';
import browseImage from '../../../asset/browse.svg';

const socket = io.connect('http://localhost:8080');

const ConversationList = ({ conversationList, conversationDetail, userData }) => {
  const { conversationId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredMessage, setEnteredMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [page, setPage] = useState(1);

  const chatRoomRef = useRef(null);

  const getInitials = (name) => {
    const words = name.split(' ');
    let initials = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const word of words) {
      initials += word[0].toUpperCase();
      if (initials.length === 2) break;
    }

    return initials;
  };

  const conversationDetailHandler = (id) => {
    navigate(`/conversation/detail/${id}`);
  };

  const sendMessageHandler = () => {
    const payload = {
      conversation_id: conversationId,
      message: enteredMessage,
    };

    // Send message to server
    socket.emit('send_message', {
      sender: userData?.id,
      receiver: conversationDetail?.data?.target_id,
      message: enteredMessage,
      room: conversationId,
    });

    dispatch(postSendMessageRequest(payload));
    setMessageList((prevState) => [
      ...prevState,
      {
        id: uuidv4(), // temporary to avoid error mapping messageList
        conversation_id: conversationId,
        user_id: userData?.id,
        message: enteredMessage,
        createdAt: new Date(),
      },
    ]);

    setEnteredMessage('');
  };

  useEffect(() => {
    if (conversationId) {
      // TODO: Don't Scroll to Bottom When Fetch Pagination
      // Scroll to last message
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [conversationId]);

  useEffect(() => {
    const scrollHandler = () => {
      const chatRoom = chatRoomRef.current;

      // Check if scroll is on top
      if (chatRoom.scrollTop === 0) {
        setPage((prevState) => prevState + 1);
      }
    };

    // Assign scroll event to chatRoomRef
    const chatRoom = chatRoomRef.current;
    if (chatRoom) {
      chatRoom.addEventListener('scroll', scrollHandler);

      // Clean up the event listener
      return () => {
        chatRoom.removeEventListener('scroll', scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    dispatch(getConversationListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (conversationId) {
      // Join room if convId exist on params
      socket.emit('join_room', conversationId);
      dispatch(getConversationDetailRequest({ id: conversationId, query: { page, pageSize: 10 } }));
    }
  }, [conversationId, dispatch, page]);

  // Avoid receive duplicate message
  useEffect(() => {
    if (conversationDetail?.data?.Messages && conversationDetail?.data?.hasMoreMessage) {
      setMessageList((prevState) => {
        const lastPrevId = _.last(prevState)?.id;
        const lastDetailId = _.last(conversationDetail?.data?.Messages)?.id;

        if (lastPrevId !== lastDetailId) {
          return [...conversationDetail?.data?.Messages, ...prevState];
        }

        return prevState;
      });
    }
  }, [conversationDetail?.data?.Messages, conversationDetail?.data?.hasMoreMessage]);

  useEffect(() => {
    // Receive message from server
    socket.on('receive_message', (data) => {
      if (data.sender !== userData.id && conversationId) {
        setMessageList((prevState) => [
          ...prevState,
          {
            id: uuidv4(), // temporary to avoid error mapping messageList
            conversation_id: conversationId,
            user_id: data.receiver,
            message: data.message,
            createdAt: new Date(),
          },
        ]);
      }
    });
  }, [conversationId, userData.id]);

  return (
    <Container className={classes.container}>
      <Box className={classes.wrapper_left}>
        <Box className={`${classes.target_list} ${conversationId && classes.hide}`}>
          <Typography variant="h5" className={classes.conv_header}>
            <FormattedMessage id="conversation_list" />
          </Typography>
          {conversationList?.data?.map((data) => (
            <Box
              key={data.id}
              onClick={() => conversationDetailHandler(data.id)}
              className={`${data.id === conversationId ? classes.target_item_selected : classes.target_item}`}
            >
              {data.user_id === userData?.id ? (
                <Avatar src={data.TargetUser.image_url} alt={data.TargetUser.fullName}>
                  {getInitials(data.TargetUser.fullName)}
                </Avatar>
              ) : (
                <Avatar src={data.User.image_url} alt={data.User.fullName}>
                  {getInitials(data.User.fullName)}
                </Avatar>
              )}
              {data.user_id === userData?.id ? (
                <Typography variant="body1">{data.TargetUser.fullName}</Typography>
              ) : (
                <Typography variant="body1">{data.User.fullName}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={`${classes.wrapper_right} ${!conversationId && classes.hide}`}>
        {conversationId ? (
          <>
            <Box className={classes.target_wrapper}>
              <Avatar
                src={
                  userData.id === conversationDetail?.data?.user_id
                    ? conversationDetail?.data?.TargetUser?.image_url
                    : conversationDetail?.data?.User?.image_url
                }
                alt="profile"
              />
              <Typography variant="body1">
                {userData.id === conversationDetail?.data?.user_id
                  ? conversationDetail?.data?.TargetUser?.fullName
                  : conversationDetail?.data?.User?.fullName}
              </Typography>
            </Box>
            <Box className={classes.chat_room} ref={chatRoomRef}>
              {messageList.map((data) => (
                <Box
                  key={data.id}
                  className={classes.bubble_chat_wrapper}
                  sx={{
                    textAlign: data.user_id === userData?.id && 'right',
                  }}
                >
                  <Typography variant="body1" className={classes.bubble_chat}>
                    {data.message}
                  </Typography>
                  <Typography variant="body1" className={classes.date}>
                    {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(
                      new Date(data.createdAt)
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box className={classes.input_wrapper}>
              <CustomInput
                label=""
                value={enteredMessage}
                onChange={(e) => setEnteredMessage(e.target.value)}
                errorLabel=""
                placeholder="message_type"
                onKeyDown={(e) => e.key === 'Enter' && sendMessageHandler()}
              />
              <IconButton onClick={sendMessageHandler} className={classes.btn_wrapper}>
                <SendIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box className={classes.no_conv_wrapper}>
            <img src={browseImage} alt="browse" />
            <Typography variant="h5" className={classes.no_conv}>
              <FormattedMessage id="message_no_conversation" />
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

ConversationList.propTypes = {
  conversationList: PropTypes.object,
  conversationDetail: PropTypes.object,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  conversationList: selectConversationList,
  conversationDetail: selectConversationDetail,
  userData: selectuserData,
});

export default connect(mapStateToProps)(ConversationList);
