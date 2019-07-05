import React from 'react';
import Chat from '../components/Chat';

import { SystemState } from '../store/system/types';

import { ChatState, Message } from '../store/chat/types';
import { sendMessage, getMessages } from '../store/chat/actions';

import { AppState } from '../store';
import { connect } from 'react-redux';

interface AppProps {
  chat: ChatState;
  system: SystemState;
  sendMessage: typeof sendMessage;
  getMessages: typeof getMessages;
}

class ChatScreen extends React.Component<AppProps> {
  static navigationOptions = {
    title: 'Chat',
  };

  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    const onSend = (messages: Message[]) => {
      for (const message of messages) {
        this.props.sendMessage(message);
      }
    };
    return (
      <Chat
        messages={this.props.chat.messages}
        onSend={onSend}
        user={this.props.system.user}
      />
    );
  }

}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  chat: state.chat,
});

const mapDispatchToProps = {
  sendMessage,
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
