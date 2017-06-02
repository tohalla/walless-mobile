// @flow
import React from 'react';
import {compose} from 'react-apollo';
import {View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import {pickBy, isEqual, hasIn} from 'lodash/fp';

import {getActiveAccount} from '../graphql/account/account.queries';
import Home from '../views/Home.component';
import Authentication from '../account/Authentication.component';

const routes = {
	home: {screen: Home},
	browse: {screen: View},
	favorites: {screen: View, display: account => account},
	account: {screen: View, display: account => account},
	authentication: {screen: Authentication, display: account => !account}
};

class MainNavigator extends React.Component {
	shouldComponentUpdate = nextProps =>
		!(
			hasIn(['getActiveAccount', 'account'])(this.props) &&
			hasIn(['getActiveAccount', 'account'])(this.props)
		) ||
		!isEqual(nextProps.getActiveAccount.account)(this.props.getActiveAccount.account)
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
