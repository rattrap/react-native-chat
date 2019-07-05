import {
  ChatState,
  ChatActionTypes,
  SEND_MESSAGE,
  GET_MESSAGES,
  RECEIVED_MESSAGE,
} from './types';
import { GiftedChat } from 'react-native-gifted-chat';

const initialState: ChatState = {
  messages: [],
};

export function chatReducer(
  state = initialState,
  action: ChatActionTypes,
): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;
    case GET_MESSAGES:
      return {
        messages: GiftedChat.append([], action.payload),
      };
    case RECEIVED_MESSAGE:
      return {
        messages: GiftedChat.append(state.messages, [action.payload]),
      };
    default:
      return state;
  }
}
