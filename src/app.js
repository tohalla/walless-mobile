// @flow
import React from 'react';
import I18n from 'react-native-i18n';
import {ApolloProvider} from 'react-apollo';

import MainNavigator from './MainNavigator.component';
import translations from './translations';
import apolloClient from './apolloClient';

export default class App extends React.Component {
  render() {
    return (
			<ApolloProvider client={apolloClient}>
				<MainNavigator />
			</ApolloProvider>
    );
  }
}

Object.assign(
	I18n,
	{fallbacks: true, translations}
);

