import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps } from 'react-navigation';

import { SystemState } from '../store/system/types';
import { updateSession } from '../store/system/actions';
import { receivedMessage } from '../store/chat/actions';
import { AppState } from '../store';
import { connect } from 'react-redux';
import Parse from '../parse';

interface AppProps {
  system: SystemState;
  updateSession: typeof updateSession;
  receivedMessage: typeof receivedMessage;
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
});

const mapDispatchToProps = {
  updateSession,
  receivedMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)((props: AppProps & ScreenProps) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const subscribeToParse = async () => {
    const query = new Parse.Query('Chat3');
    const subscription = await query.subscribe();
    subscription.on('open', () => {
      console.log('subscription opened');
    });

    subscription.on('create', message => {
      const user = message.get('user');
      props.receivedMessage({
        _id: message.id,
        text: message.get('text'),
        createdAt: new Date(message.createdAt),
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
      });
    });
  };

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  const handleLoadingError = (error: Error) => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    setLoadingComplete(true);
    props.updateSession({
      loggedIn: true,
      user: {
        _id: '1',
        name: 'Leo',
        avatar: 'https://placeimg.com/140/140/any',
      },
    });

    subscribeToParse();
    props.navigation.navigate('Main');
  };

  if (isLoadingComplete || props.skipLoadingScreen) {
    return null;
  }

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={handleFinishLoading}
    />
  );
});
