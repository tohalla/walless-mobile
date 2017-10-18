import {AsyncStorage} from 'react-native';
import I18n from 'react-native-i18n';
import {subscribe} from 'walless-graphql';

import config from 'walless-native/config';
import client from 'walless/apolloClient';
import store from 'walless/store';
import {NavigationActions} from 'react-navigation';
import {addNotification} from 'walless/notification/notification.reducer';

export const initializeNotificationHandler = async () =>
  subscribe(
    {
      url: `${config.websocket.url}/user`,
      headers: {
        authorization: await AsyncStorage.getItem('ws-token')
      },
      client
    },
    ({newRecord, oldRecord, target, operations}) =>
      target.toLowerCase() === 'order' ?
        operations.toLowerCase() === 'update' &&
        !(oldRecord && oldRecord.completed) &&
        newRecord.completed &&
        store.dispatch(addNotification({
          type: 'success',
          message: I18n.t('notifications.orderCompleted', {order: newRecord.id}),
          actions: [{
            label: I18n.t('view'),
            onPress: () => store.dispatch(NavigationActions.navigate({
              routeName: 'orders'
            })),
            deleteOnPress: true
          }]
        }))
      : null
  );
