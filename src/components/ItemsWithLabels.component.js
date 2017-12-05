import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {content, normal} from 'walless/styles/spacing';

export default class ItemsWithLabels extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        item: PropTypes.node
      }),
      PropTypes.node
    ])),
    style: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.number,
      PropTypes.object
    ])
  };
  constructor(props) {
    super(props);
    this.state = {
      labelsWidth: .5 * props.items.reduce((length, item) =>
        item && item.label && item.label.length > length ?
          item.label.length
        : item && item.length && item.length > length ?
          item.length
        : length,
        0
      ) + 'rem'
    };
  }
  render() {
    const {items, style, ...props} = this.props;
    return (
      <View style={[].concat(styles.container, style)} {...props}>
        {items.filter(item => item).map((item, index) => (
          <View key={index} style={EStyleSheet.child(styles, 'row', index, items.length)}>
            {item.label ?
              <View style={[styles.labels, {flexBasis: EStyleSheet.value(this.state.labelsWidth)}]}>
                {
                  typeof item.label === 'string' || typeof item.label === 'number' ?
                    <Text>{item.label}</Text> :
                    item.label
                }
              </View> : null
            }
            {
              typeof item.item === 'string' || typeof item.item === 'number' ?
                <Text>{item.item}</Text> :
                item.item
            }
          </View>
        ))}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  labels: {
    marginRight: normal
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: content
  },
  ['row:last-child']: {
    paddingBottom: 0
  }
});
