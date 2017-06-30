// @flow
import {StackNavigator} from 'react-navigation';

import Settings from 'walless/settings/Settings.component';
import Account from 'walless/account/Account.component';
import colors from 'walless/styles/colors';
import header from 'walless/styles/header';

export const initialRouteName = 'settings';

export const settingsRoutes = {
  [initialRouteName]: {
    screen: Settings,
    translationKey: 'navigation.settings.settings'
  },
  settingsAccount: {
    screen: Account,
    navigation: true,
    translationKey: 'navigation.settings.account'
  }
};

const SettingsNavigation = new StackNavigator(
  settingsRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation: {titles, state}}) => ({
      title: titles[state.routeName],
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground,
      headerBackTitleStyle: header.text
    })
  }
);

export default SettingsNavigation;
