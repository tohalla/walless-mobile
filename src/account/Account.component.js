import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {withApollo, compose} from 'react-apollo';
import ModalDropdown from 'react-native-modal-dropdown';

import {RESET_NAVIGATION} from 'walless/actionTypes';
import NavigationItem from 'walless/components/NavigationItem.component';
import NavigationButton from 'walless/components/NavigationButton.component';
import {logout} from 'walless/util/auth';
import container from 'walless/styles/container';
import input from 'walless/styles/input';
import text from 'walless/styles/text';
import {getActiveAccount} from 'walless/graphql/account/account.queries';

const mapStateToProps = state => ({
  languages: state.translation.languages
});

class Account extends React.Component {
  handleLogout = async() => {
    await logout();
    this.props.client.resetStore();
    this.props.resetNavigation();
  };
  render() {
    const {languages, account} = this.props;
    const language = typeof account.language === 'string' ?
      languages.find(lang => account.language === lang.locale) : account.language;
    return (
      <View style={[container.container]}>
        <NavigationItem>
          {I18n.t('language')}
          <ModalDropdown
              defaultIndex={languages.indexOf(language)}
              defaultValue={`${language.name} (${language.locale})`}
              dropdownStyle={input.dropdown}
              onValueChange={() => {}}
              options={languages.map(lang => `${lang.name} (${lang.locale})`)}
              selectedValue = {account.language}
              textStyle={text.text}
          />
        </NavigationItem>
        <NavigationButton onPress={this.handleLogout}>
          {I18n.t('account.signOut')}
        </NavigationButton>
      </View>
    );
  }
}

export default withApollo(compose(
  connect(mapStateToProps, {resetNavigation: () => ({type: RESET_NAVIGATION})}),
  getActiveAccount
)(Account));
