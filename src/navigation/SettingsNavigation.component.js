import React from 'react';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';

import Navigation, {settingsRoutes} from 'walless/navigation/SettingsNavigation';

const mapStateToProps = state => ({
  language: state.translation.language
});

class SettingsNavigation extends React.Component {
  render() {
    return (
      <Navigation
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

export default connect(mapStateToProps)(SettingsNavigation);
