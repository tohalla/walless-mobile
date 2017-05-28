import React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {hasIn} from 'lodash/fp';

import {setActiveRestaurant} from '../restaurant/restaurant';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
	restaurant: hasIn(['restaurant', 'activeRestaurant'])(state) ?
		state.restaurant.activeRestaurant.id : null
});

class Home extends React.Component {
	static navigationOptions = {
		drawerLabel: 'Home'
	};
	constructor(props) {
		super(props);
		props.setActiveRestaurant({id: 3});
	}
	render() {
		const {getRestaurant: {restaurant} = {}} = this.props;
		return restaurant ?
			<View />
		: <View style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<TouchableOpacity
						onPress={() => {}}
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
