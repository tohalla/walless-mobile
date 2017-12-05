import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {withApollo, compose} from 'react-apollo';
import ModalDropdown from 'react-native-modal-dropdown';
import {account} from 'walless-graphql';

import {RESET_NAVIGATION} from 'walless/actionTypes';
import NavigationItem from 'walless/components/NavigationItem.component';
import NavigationButton from 'walless/components/NavigationButton.component';
import {logout} from 'walless/util/auth';
import container from 'walless/styles/container';
import text from 'walless/styles/text';
import {settingsRoutes} from 'walless/navigation/SettingsNavigation';

const mapStateToProps = state => ({
  languages: state.translation.languages
});

class Account extends React.Component {
  static propTypes = {
    client: PropTypes.shape({resetStore: PropTypes.func.isRequired}),
    resetNavigation: PropTypes.func.isRequired,
    languages: PropTypes.arrayOf(PropTypes.shape({locale: PropTypes.string})),
    account: PropTypes.object,
    navigation: PropTypes.shape({navigate: PropTypes.func.isRequired})
  };
  handleLogout = async() => {
    await logout();
    this.props.client.resetStore();
    this.props.resetNavigation();
  };
  handleLangugageChange = async(language) => {
    const {account, getActiveAccount, updateAccount} = this.props;
    await updateAccount(Object.assign({}, account, {language: language.locale}));
    getActiveAccount.refetch();
  };
  render() {
    const {languages, account, navigation} = this.props;
    const language = typeof account.language === 'string' ?
      languages.find(lang => account.language === lang.locale) : account.language;
    return (
      <View style={[container.container]}>
        <NavigationItem>
          {I18n.t('language')}
          <ModalDropdown
            defaultIndex={languages.indexOf(language)}
            defaultValue={`${language.name} (${language.locale})`}
            dropdownStyle={styles.dropdown}
            onSelect={index => this.handleLangugageChange(languages[index])}
            options={languages.map(lang => `${lang.name} (${lang.locale})`)}
            selectedValue={account.language}
            textStyle={text.text}
          />
        </NavigationItem>
        <NavigationButton
          key={settingsRoutes.settingsAccountPassword}
          onPress={() => navigation.navigate('settingsAccountPassword')}
        >
          {I18n.t(settingsRoutes.settingsAccountPassword.translationKey)}
        </NavigationButton>
        <NavigationButton onPress={this.handleLogout}>
          {I18n.t('account.signOut')}
        </NavigationButton>
      </View>
    );
  }
}

export default withApollo(compose(
  connect(mapStateToProps, {resetNavigation: () => ({type: RESET_NAVIGATION})}),
  account.getActiveAccount,
  account.updateAccount
)(Account));

const styles = {
  dropdown: {
    height: 'auto',
    maxHeight: 200,
    minWidth: 120
  }
};
