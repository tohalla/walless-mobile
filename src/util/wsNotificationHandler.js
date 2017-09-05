import {AsyncStorage} from 'react-native';
import I18n from 'react-native-i18n';

import subscribe from 'walless-graphql/subscribe';
import config from 'walless-native/config';
import client from 'walless/apolloClient';

export const initializeNotificationHadnler = async ({notify}) =>
  subscribe(
    {
      url: `${config.websocket.protocol}://${config.websocket.url}:${config.websocket.port}/user`,
      wsToken: await AsyncStorage.getItem('ws-token'),
      client
    },
    ({newRecord, oldRecord, target, operations}) =>
      target.toLowerCase() === 'order' ?
        operations.toLowerCase() === 'update' &&
        !(oldRecord && oldRecord.completed) &&
        newRecord.completed &&
        notify({
          type: 'success',
          message: I18n.t('notifications.orderCompleted', {order: newRecord.id})
        })
      : null
  );
