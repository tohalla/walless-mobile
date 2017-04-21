import React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';

export default class Home extends React.Component {
	render() {
		return (
			<View style={{
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
			</View>
		);
	}
}
