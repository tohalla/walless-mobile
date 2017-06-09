import {NavigationActions} from 'react-navigation';

export const resetNavigation = (navigation, routeName) =>
  navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName})
    ]
  }));
