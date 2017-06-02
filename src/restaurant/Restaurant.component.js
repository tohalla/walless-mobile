// @flow
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {hasIn} from 'lodash/fp';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';

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
		console.log(this.props);
		return typeof restaurant === 'object' ? (
			<View>
				<View>
					<Text>{restaurant.name}</Text>
					<Text>{restaurant.description}</Text>
				</View>
				<TouchableOpacity
						onPress={() => navigation.navigate('menus')}
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
						{'placeholder for browse menus'}
					</Text>
				</TouchableOpacity>
			</View>
		) : null;
	}
}

export default compose(
	connect(mapStateToProps),
	getRestaurant
)(Restaurant);
