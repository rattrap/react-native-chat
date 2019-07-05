import { User } from '../system/types';

export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
}

export interface ChatState {
  messages: Message[];
}

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

interface GetMessagesAction {
  type: typeof GET_MESSAGES;
  payload: Message[];
}

interface ReceivedMessagesAction {
  type: typeof RECEIVED_MESSAGE;
  payload: Message;
}

export type ChatActionTypes = SendMessageAction | GetMessagesAction | ReceivedMessagesAction;
