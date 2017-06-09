// @flow
import {View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import Home from '../views/Home.component';
import Authentication from '../account/Authentication.component';

const routes = {
	home: {screen: Home},
	browse: {screen: View},
	favorites: {screen: View},
	account: {screen: View},
	authentication: {screen: Authentication}
};

const MainNavigation = new DrawerNavigator(routes, {initialRouteName: 'home'});

export default MainNavigation;

const {router: {getStateForAction, getActionForPathAndParams}} = MainNavigation;


export const navigationReducer = (
  state = getStateForAction(getActionForPathAndParams('home')),
  action
) => getStateForAction(action, state) || state;
