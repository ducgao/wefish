/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/MainNavigator';
import {name as appName} from './app.json';

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App);
