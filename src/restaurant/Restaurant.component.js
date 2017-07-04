// @flow
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import Swiper from 'react-native-swiper';
import I18n from 'react-native-i18n';

import {disconnectFromServingLocation} from 'walless/servingLocation.reducer';
import text from 'walless/styles/text';
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
  const {getRestaurant: {loading} = {}, restaurant, navigation} = props;
  if (!restaurant && !loading) {
    navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'restaurantSelection'})
      ]
    }));
    return false;
  }
  return true;
};

class Restaurant extends React.Component {
  componentWillMount = () => checkRestaurant(this.props);
  shouldComponentUpdate = nextProps => checkRestaurant(nextProps);
  render() {
    const {
      restaurant: {
        information: {
          [this.props.language]: {
            name, description
          } = {}
        },
        images = []
      } = {information: {}},
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
              activeDotColor={colors.foregroundLight}
              dotColor="rgba(0,0,0,0.8)"
              height={250}
          >
            {images.map((image, index) => (
              <Image
                  key={index}
                  source={{uri: image.uri}}
                  style={container.slide}
              />
            ))}
          </Swiper>
          <View style={[container.container, container.light]}>
              {
                Object.keys(restaurantRoutes).map(route => (
                  restaurantRoutes[route].navigation &&
                  <Button
                      key={route}
                      onPress={() => navigation.navigate(route)}
                      style={[button.padded, button.stretch]}
                  >
                    {I18n.t(restaurantRoutes[route].translationKey)}
                  </Button>
                ))
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
  connect(mapStateToProps, dispatch => ({
    disconnectFromServingLocation: value => dispatch(disconnectFromServingLocation(value)),
    dispatch
  })),
  getRestaurant
)(Restaurant);
