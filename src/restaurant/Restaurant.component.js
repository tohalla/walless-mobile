// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, isEqual} from 'lodash/fp';
import Swiper from 'react-native-swiper';
import I18n from 'react-native-i18n';
import {restaurant} from 'walless-graphql';

import {setRestaurantNavigation} from 'walless/navigation/navigation.actions';
import {disconnectFromServingLocation} from 'walless/restaurant/servingLocation.reducer';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import Button from 'walless/components/Button.component';
import {restaurantRoutes} from 'walless/navigation/RestaurantNavigation';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

const checkRestaurant = async(props) => {
  const {getRestaurant: {loading} = {}, restaurant, setRestaurantNavigation} = props;
  if (!restaurant && !loading) {
    setRestaurantNavigation({
      index: 0,
      routes: [{
        key: 'restaurantSelection',
        routeName: 'restaurantSelection'
      }]
    });
    return false;
  }
  return true;
};

class Restaurant extends React.Component {
  static propTypes = {
    restaurant: PropTypes.shape({
      i18n: PropTypes.object,
      images: PropTypes.array
    }),
    language: PropTypes.string,
    navigation: PropTypes.shape({navigate: PropTypes.func.isRequired}),
    disconnectFromServingLocation: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    checkRestaurant(props);
  }
  shouldComponentUpdate = nextProps =>
    !isEqual(this.props.restaurant)(nextProps.restaurant) ?
      checkRestaurant(nextProps) : false;
  render() {
    const {
      restaurant: {
        i18n: {
          [this.props.language]: {
            name, description
          } = {}
        },
        images = []
      } = {i18n: {}},
      navigation,
      disconnectFromServingLocation
    } = this.props;
    return (
      <LoadContent loadProps={this.props}>
        <ScrollView
          alwaysBounceVertical={false}
          style={[container.container]}
        >
          {images.length ?
            <Swiper
              activeDotColor={colors.foregroundLight}
              dotColor='rgba(0,0,0,0.8)'
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
          : null}
          <View style={[container.container, container.light, {alignItems: 'stretch'}]}>
            {
                Object.keys(restaurantRoutes).map(route => (
                  restaurantRoutes[route].navigation &&
                  <Button
                    key={route}
                    onPress={() => navigation.navigate(route)}
                    padded
                  >
                    {I18n.t(restaurantRoutes[route].translationKey)}
                  </Button>
                ))
              }
            <Button onPress={disconnectFromServingLocation} padded>
              {I18n.t('restaurant.servingLocation.checkout')}
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
  connect(mapStateToProps, {
    disconnectFromServingLocation,
    setRestaurantNavigation
  }),
  restaurant.getRestaurant
)(Restaurant);
