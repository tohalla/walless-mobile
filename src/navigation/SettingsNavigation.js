// @flow
import React from 'react';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {get} from 'lodash/fp';

import {changePassword} from 'walless/util/auth';
import Settings from 'walless/settings/Settings.component';
import Button from 'walless/components/Button.component';
import Account from 'walless/account/Account.component';
import Password from 'walless/account/Password.component';
import AvoidKeyboard from 'walless/components/AvoidKeyboard.component';
import colors from 'walless/styles/colors';
import header from 'walless/styles/header';
import OpenDrawerButton from 'walless/navigation/OpenDrawerButton.component';

export const initialRouteName = 'settings';

const ChangePassword = class ChangePassword extends React.Component {
  state = {
    loading: false
  };
  handleChangePassword = async (payload) => {
    this.setState({loading: true});
    await changePassword(payload);
    this.setState({loading: false});
    this.props.navigation.goBack();
  }
  render = () => (
    <AvoidKeyboard>
      <Password
          onSubmit={this.handleChangePassword}
          requireCurrent
          requireRetype
      />
    </AvoidKeyboard>
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

const LeftButton = connect(
  state => ({navigationState: get(['navigation', 'settings'])(state)})
)(({
  navigationState: {index, routes},
  navigation,
  titles,
  ...props
}) => index === 0 ?
  <OpenDrawerButton {...props} />
: (
  <Button onPress={() => navigation.goBack()} {...props}>
    <Icon
        color={colors.headerForeground}
        name="chevron-left"
        size={20}
    />
  </Button>
));

export const SettingsNavigation = new StackNavigator(
  settingsRoutes,
  {
    initialRouteName,
    transitionConfig: () => ({transitionSpec: {duration: 0}}),
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName],
      headerLeft: <LeftButton navigation={navigation} style={header.button} titles={titles}/>,
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground
    })
  }
);

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'settings'])(state),
  language: state.translation.language
});

class Navigation extends React.Component {
  render() {
    return (
      <SettingsNavigation
          navigation={addNavigationHelpers({
            state: this.props.navigationState,
            dispatch: this.props.dispatch
          })}
          screenProps={{
            titles: Object.keys(settingsRoutes).reduce((prev, key) =>
              Object.assign(
                {},
                prev,
                {[key]: settingsRoutes[key].translationKey ?
                  I18n.t(settingsRoutes[key].translationKey) : null
                }
              ), {}
            )
          }}
      />
    );
  }
}

export default connect(mapStateToProps)(Navigation);
