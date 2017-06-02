import React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {hasIn} from 'lodash/fp';

import RestaurantNavigator from '../restaurant/RestaurantNavigator.component';
import {setActiveRestaurant} from '../active.reducer';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
	restaurant: hasIn(['active', 'restaurant'])(state) ?
		state.active.restaurant : null
});

class Home extends React.Component {
	static navigationOptions = {
		drawerLabel: 'Home'
	};
	render() {
		const {getRestaurant: {restaurant} = {}, setActiveRestaurant} = this.props;
		return restaurant ?
			<RestaurantNavigator props={{restaurant}} />
		: <View style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<TouchableOpacity
						onPress={() => setActiveRestaurant(3)}
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
						{'scan qr code'}
					</Text>
				</TouchableOpacity>
			</View>;
	}
}

export default compose(
	connect(mapStateToProps, {setActiveRestaurant}),
	getRestaurant
)(Home);
