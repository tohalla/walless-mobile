import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import EStyleSheet from 'react-native-extended-stylesheet';
import {order} from 'walless-graphql';

import Header from 'walless/components/Header.component';
import {OrderStateInficator} from 'walless/util/order';
import MenuItems from 'walless/restaurant/MenuItems.component';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import {minor, normal} from 'walless/styles/spacing';
import ItemsWithLabels from 'walless/components/ItemsWithLabels.component';

const mapStateToProps = state => ({
  language: state.translation.language
});

class Order extends React.Component {
  static propTypes = {
    order: PropTypes.shape({id: PropTypes.number})
  };
  static navigationOptions = ({navigation}) => ({
    title: get([
      'state',
      'params',
      'order',
      'id'
    ]
    )(navigation)
  });
  render() {
    const {
      order = get(['navigation', 'state', 'params', 'order'])(this.props)
    } = this.props;
    const {
      items = [],
      createdAt,
      completed
    } = order;
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={container.container}
      >
        <ItemsWithLabels
          items={[
              {
                label: I18n.t('restaurant.order.createdAt'),
                item: createdAt
              },
              {
                label: I18n.t('restaurant.order.completedAt'),
                item: completed
              },
              {
                label: I18n.t('restaurant.order.state.state'),
                item: <OrderStateInficator {...order} />
              }
            ]}
          style={styles.information}
        />
        <MenuItems
          items={items.map(item => item.menuItem)}
          listViewProps={{
              renderSectionHeader: () =>
                <Header label={I18n.t('restaurant.order.items')} />,
              stickyHeadersEnabled: true
            }}
          swipeable={{}}
        />
      </ScrollView>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  order.getOrder
)(Order);


const styles = EStyleSheet.create({
  information: {
    paddingVertical: minor,
    paddingHorizontal: normal,
    backgroundColor: colors.backgroundLight
  }
});
