import React from 'react';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';

import Navigation, {ordersRoutes} from 'walless/navigation/OrdersNavigation';

const mapStateToProps = state => ({
  language: state.translation.language
});

class OrdersNavigation extends React.Component {
  render() {
    return (
      <Navigation
          screenProps={{
            titles: Object.keys(ordersRoutes).reduce((prev, key) =>
              Object.assign(
                {},
                prev,
                {[key]: ordersRoutes[key].translationKey ?
                  I18n.t(ordersRoutes[key].translationKey) : null
                }
              ),
              {}
            )
          }}
      />
    );
  }
}

export default connect(mapStateToProps)(OrdersNavigation);
