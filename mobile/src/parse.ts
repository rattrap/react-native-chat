import url from 'url';
import { NativeModules, AsyncStorage } from 'react-native';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('APPLICATION_ID');
Parse.serverURL = `http://${hostname}:1337/parse`;

export default Parse;
