import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView} from 'react-native';
import {hasIn, isEqual} from 'lodash/fp';

import {getMenusByRestaurant} from '../graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
	restaurant: hasIn(['active', 'restaurant'])(state) ?
		state.active.restaurant : null
});

class Menus extends React.Component {
	static navigationOptions = {
		title: 'Menus'
	};
	static PropTypes = {
		restaurant: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => !isEqual(r1)(r2)
			})
		};
	};
	componentWillReceiveProps(newProps) {
		if (!isEqual(this.props.getMenusByRestaurant)(newProps.getMenusByRestaurant)) {
			this.setState({
				dataSource: Array.isArray(newProps.getMenusByRestaurant.menus) ?
					this.state.dataSource.cloneWithRows(newProps.getMenusByRestaurant.menus) :
					this.state.dataSource.cloneWithRows([])
			});
		}
	};
	render() {
		const {dataSource} = this.state;
		return (
			<View style={{
				height: '100%'
			}}>
				<ListView
						dataSource={dataSource}
						renderRow={menu => (
							<View style={{
								backgroundColor: 'white',
								borderBottomWidth: 1,
								borderColor: 'lightgray'
							}}>
								<Text>{menu.name}</Text>
								<Text>{menu.description}</Text>
							</View>
						)}
				/>
			</View>
		);
	}
}

export default compose(
	connect(mapStateToProps),
	getMenusByRestaurant
)(Menus);
