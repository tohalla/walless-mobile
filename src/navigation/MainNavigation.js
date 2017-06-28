// @flow
import {View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import Home from 'walless/views/Home.component';
import Account from 'walless/account/Account.component';

const initialRouteName = 'home';

export const routes = {
	[initialRouteName]: {
    screen: Home,
    translationKey: 'navigation.home'
  },
	browse: {screen: View},
	favorites: {screen: View},
	account: {screen: Account}
};

const MainNavigation = new DrawerNavigator(routes, {initialRouteName});


const {router: {getStateForAction, getActionForPathAndParams}} = MainNavigation;

export const navigationReducer = (
  state = getStateForAction(getActionForPathAndParams(initialRouteName)),
  action
) => getStateForAction(action, state) || state;

export default MainNavigation;
