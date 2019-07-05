import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ({ messages, user, onSend }) {
  return (
    <GiftedChat
      showUserAvatar={true}
      messages={messages}
      onSend={onSend}
      user={user}
    />
  );
}
