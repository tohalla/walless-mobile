import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import Button from 'walless/components/Button.component';
import colors from 'walless/styles/colors';

export default connect(
  null, {navigate: NavigationActions.navigate}
)(({navigate}) => (
  <Button
      onPress={() => navigate({routeName: 'DrawerOpen'})}
      padded
  >
    <Icon
        color={colors.headerForeground}
        name="menu"
        size={20}
    />
  </Button>
));
