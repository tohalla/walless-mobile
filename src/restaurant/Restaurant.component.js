// @flow
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, map} from 'lodash/fp';
import Swiper from 'react-native-swiper';
import I18n from 'react-native-i18n';

import {disconnectFromServingLocation} from 'walless/servingLocation.reducer';
import text from 'walless/styles/text';
import {resetNavigation} from 'walless/navigation/navigation';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import button from 'walless/styles/button';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import Button from 'walless/components/Button.component';
import {restaurantRoutes} from 'walless/navigation/RestaurantNavigation';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

const checkRestaurant = props => {
  const {
    getRestaurant: {restaurant, data: {loading}} = {data: {}},
    navigation
  } = props;
  if (!restaurant && !loading) {
    resetNavigation(navigation, 'selection');
  }
};

class Restaurant extends React.Component {
  componentWillMount = () => checkRestaurant(this.props);
  componentWillReceiveProps = newProps => checkRestaurant(newProps);
  render() {
    const {
      getRestaurant: {
        restaurant: {
          information: {
            [this.props.language]: {
              name, description
            } = {}
          },
          files = []
        }
      } = {restaurant: {information: {}}},
      navigation,
      disconnectFromServingLocation
    } = this.props;
    return (
      <LoadContent loadProps={this.props}>
        <ScrollView
            alwaysBounceVertical={false}
            style={[container.container]}
        >
          <Swiper
              activeDotColor={colors.carrara}
              dotColor="rgba(0,0,0,0.8)"
              height={250}
          >
            {files.map((file, index) => (
              <Image
                  key={index}
                  source={{uri: file.uri}}
                  style={container.slide}
              />
            ))}
          </Swiper>
          <View style={[container.container, container.padded, container.light]}>
              {
                map(route => (
                  restaurantRoutes[route].navigation &&
                  <Button
                      key={route}
                      onPress={() => navigation.navigate(route)}
                      style={[button.padded, button.stretch]}
                  >
                    {I18n.t(restaurantRoutes[route].translationKey)}
                  </Button>
                ))(Object.keys(restaurantRoutes))
              }
              <Button
                  onPress={disconnectFromServingLocation}
                  style={[button.padded, button.stretch]}
              >
                {I18n.t('restaurant.servingLocations.checkout')}
              </Button>
          </View>
          <View style={[container.container, container.padded]}>
            <Text style={[text.text, text.bold, text.medium]}>{name}</Text>
            <Text style={[text.text]}>{description}</Text>
          </View>
        </ScrollView>
      </LoadContent>
    );
  }
}

export default compose(
  connect(mapStateToProps, {disconnectFromServingLocation}),
  getRestaurant
)(Restaurant);
