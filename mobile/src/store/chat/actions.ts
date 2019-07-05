import { Message, SEND_MESSAGE, ChatActionTypes, GET_MESSAGES, RECEIVED_MESSAGE } from './types';
import Parse from '../../parse';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { Action } from 'redux';

export function receivedMessage(newMessage: Message): ChatActionTypes {
  return {
    type: RECEIVED_MESSAGE,
    payload: newMessage,
  };
}

export const getMessages = (): ThunkAction<void, AppState, null, Action<string>> => {
  return async (dispatch) => {
    const Chat = Parse.Object.extend('Chat3');
    const query = new Parse.Query(Chat);
    query.descending('createdAt');
    query.find()
      .then(
        (messages) => {
          const parsedMessages: Message[] = [];

          for (const message of messages) {
            const user = message.get('user');
            parsedMessages.push({
              _id: message.id,
              text: message.get('text'),
              createdAt: new Date(message.createdAt),
              user: {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
              },
            });
          }
          dispatch({
            type: GET_MESSAGES,
            payload: parsedMessages,
          });
        },
        (error) => {
          console.log(`Failed to create new object, with error code: ${error.message}`);
        });
  };
};

export function sendMessage(newMessage: Message): ChatActionTypes {
  const Chat = Parse.Object.extend('Chat3');
  const chat = new Chat();

  chat.set('text', newMessage.text);
  chat.set('user', newMessage.user);
  chat.set('sentAt', newMessage.createdAt.toUTCString());

  chat.save()
    .then(
      (message) => {
        console.log(`New object created with objectId: ${message.id}`);
      },
      (error) => {
        console.log(`Failed to create new object, with error code: ${error.message}`);
      });
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
}
