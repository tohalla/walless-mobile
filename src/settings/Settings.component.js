import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import I18n from 'react-native-i18n';

import NavigationButton from 'walless/components/NavigationButton.component';
import {settingsRoutes} from 'walless/navigation/SettingsNavigation';
import container from 'walless/styles/container';

export default class Settings extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  };
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={container.container}
      >
        {
          Object.keys(settingsRoutes).map(route => (
            settingsRoutes[route].navigation &&
            <NavigationButton
              key={route}
              onPress={() => navigation.navigate(route)}
            >
              {I18n.t(settingsRoutes[route].translationKey)}
            </NavigationButton>
          ))
        }
      </ScrollView>
    );
  }
}
