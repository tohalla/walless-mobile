import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import Notification from 'walless/notification/Notification.component';

const mapStateToProps = state => ({
  notification: state.notification
});

const Notifications = props => (
  <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column'
      }}
  >
    {props.notification
      .sort((a, b) => a.createdAt < b.createdAt)
      .map((n, index) =>
        <Notification key={index} {...n} />
      )}
  </View>
);

export default connect(mapStateToProps)(Notifications);
