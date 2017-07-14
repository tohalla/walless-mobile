import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';

import LoadContent from 'walless/components/LoadContent.component';
import Navigation, {settingsRoutes} from 'walless/navigation/SettingsNavigation';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'settings'])(state),
  language: state.translation.language
});

class SettingsNavigation extends React.Component {
  render() {
    return (
      <LoadContent loadProps={this.props}>
        <Navigation
            navigation={addNavigationHelpers({
              state: this.props.navigationState,
              titles: Object.keys(settingsRoutes).reduce((prev, key) =>
                Object.assign(
                  {},
                  prev,
                  {[key]: settingsRoutes[key].translationKey ?
                    I18n.t(settingsRoutes[key].translationKey) : null
                  }
                ), {}
              )
            })}
        />
      </LoadContent>
  );
  }
}

export default connect(mapStateToProps)(SettingsNavigation);
