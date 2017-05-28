// @flow
import React from 'react';
import {compose} from 'react-apollo';
import {DrawerNavigator} from 'react-navigation';
import {pickBy} from 'lodash/fp';

import {getActiveAccount} from '../graphql/account/account.queries';
import routes from './routes';

class MainNavigator extends React.Component {
	render() {
		const {getActiveAccount: {account} = {}} = this.props;
		const Navigator = new DrawerNavigator(
			pickBy(
				route => typeof route.display === 'function' ? route.display(account) : true
			)(routes),
			{
				initialRouteName: 'home'
			}
		);
		return <Navigator />;
	}
}

export default compose(
  getActiveAccount
)(MainNavigator);
