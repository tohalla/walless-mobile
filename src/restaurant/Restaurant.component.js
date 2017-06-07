// @flow
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {hasIn, map} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import {restaurantRoutes} from './RestaurantNavigator.component';

const mapStateToProps = state => ({
	restaurant: hasIn(['active', 'restaurant'])(state) ?
		state.active.restaurant : null
});

class Restaurant extends React.Component {
	static navigationOptions = {
		title: 'Restaurant'
	};
	render() {
		const {
			getRestaurant: {restaurant} = {
				restaurant: this.props.screenProps ? this.props.restaurant : {}
			},
			navigation
		} = this.props;
		return typeof restaurant === 'object' ? (
			<View>
				<View>
					<Text>{restaurant.name}</Text>
					<Text>{restaurant.description}</Text>
				</View>
				{
					map(route => (
						route.navigation ?
							<TouchableOpacity
									key={route.id}
									onPress={() => navigation.navigate(route.id)}
									style={{
										width: '100%',
										padding: 12,
										alignItems: 'center'
									}}
							>
								<Text
									style={{
										fontSize: 18
									}}
								>
									{I18n.t(route.translationKey)}
								</Text>
							</TouchableOpacity> :
						null
					))(restaurantRoutes)
				}
			</View>
		) : null;
	}
}

export default compose(
	connect(mapStateToProps),
	getRestaurant
)(Restaurant);
