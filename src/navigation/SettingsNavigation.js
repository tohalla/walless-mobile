// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';

import {changePassword} from 'walless/util/auth';
import Settings from 'walless/settings/Settings.component';
import Account from 'walless/account/Account.component';
import Password from 'walless/account/Password.component';
import AvoidKeyboard from 'walless/components/AvoidKeyboard.component';
import LoadContent from 'walless/components/LoadContent.component';
import colors from 'walless/styles/colors';
import header from 'walless/styles/header';

export const initialRouteName = 'settings';

const ChangePassword = class ChangePassword extends React.Component {
  state = {
    loading: false
  };
  handleChangePassword = async(payload) => {
    this.setState({loading: true});
    await changePassword(payload);
    this.setState({loading: false});
    this.props.navigation.goBack();
  }
  render = () => (
    <LoadContent loading={this.state.loading} props={this.props}>
      <AvoidKeyboard>
        <Password
            onSubmit={this.handleChangePassword}
            requireCurrent
            requireRetype
        />
      </AvoidKeyboard>
    </LoadContent>
  )
};

export const settingsRoutes = {
  [initialRouteName]: {
    screen: Settings,
    translationKey: 'navigation.settings.settings'
  },
  settingsAccount: {
    screen: Account,
    navigation: true,
    translationKey: 'navigation.settings.account'
  },
  settingsAccountPassword: {
    screen: ChangePassword,
    navigation: false,
    translationKey: 'account.changePassword'
  },
  settingsNotifications: {
    screen: () => null,
    navigation: true,
    translationKey: 'navigation.settings.notifications'
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
