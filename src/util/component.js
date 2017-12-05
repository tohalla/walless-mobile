import React from 'react';

export const mapToProps = (Component, mapper, additionalProps = {}) =>
  class extends React.Component {
    static navigationOptions = Component.navigationOptions;
    render() {
      const props = typeof mapper === 'function' ? mapper(this.props) : {};
      return (
        <Component
          {...props}
          {...additionalProps}
          {...this.props}
        />
      );
    }
  };
