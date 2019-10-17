import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faRedditSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContext } from '../app-context';

import EdXLogo from '../../images/edx-logo.svg';

import './styles/Layout.scss';

class Layout extends Component {
  static contextType = AppContext;

  getUserMenuItems = () => {
    const { header: { userMenu } } = this.context;
    return userMenu || [];
  };

  getMainMenuItems = () => {
    const { header: { mainMenu } } = this.context;
    return mainMenu || [];
  };

  render() {
    const {
      siteUrl, siteName, username, avatar, children, headerLogo, footerLogo,
    } = this.props;
    return (
      <IntlProvider locale="en">
        <>
          <Helmet titleTemplate="%s - edX" defaultTitle="edX">
            <html lang="en" />
          </Helmet>
          <SiteHeader
            logo={headerLogo || EdXLogo}
            logoDestination={siteUrl}
            logoAltText={siteName}
            loggedIn={!!username}
            username={username}
            avatar={avatar}
            mainMenu={this.getMainMenuItems()}
            userMenu={this.getUserMenuItems()}
            loggedOutItems={[
              { type: 'item', href: '#', content: 'Login' },
              { type: 'item', href: '#', content: 'Sign Up' },
            ]}
            skipNavId="content"
          />
          <main id="content">
            {children}
          </main>
          <SiteFooter
            siteName={siteName}
            siteLogo={footerLogo || EdXLogo}
            marketingSiteBaseUrl="https://www.edx.org"
            supportUrl="https://support.edx.org/hc/en-us"
            contactUrl="https://courses.edx.org/support/contact_us"
            openSourceUrl="https://open.edx.org/"
            termsOfServiceUrl="https://www.edx.org/edx-terms-service"
            privacyPolicyUrl="https://www.edx.org/edx-privacy-policy"
            socialLinks={[
              {
                title: 'Facebook',
                url: 'https://www.facebook.com/edX',
                icon: <FontAwesomeIcon icon={faFacebookSquare} className="social-icon" size="2x" />,
                screenReaderText: 'Like edX on Facebook',
              },
              {
                title: 'Twitter',
                url: 'https://twitter.com/edXOnline',
                icon: <FontAwesomeIcon icon={faTwitterSquare} className="social-icon" size="2x" />,
                screenReaderText: 'Follow edX on Twitter',
              },
              {
                title: 'LinkedIn',
                url: 'http://www.linkedin.com/company/edx',
                icon: <FontAwesomeIcon icon={faLinkedin} className="social-icon" size="2x" />,
                screenReaderText: 'Follow edX on LinkedIn',
              },
              {
                title: 'Reddit',
                url: 'https://www.reddit.com/r/edX/',
                icon: <FontAwesomeIcon icon={faRedditSquare} className="social-icon" size="2x" />,
                screenReaderText: 'Subscribe to the edX subreddit',
              },
            ]}
            appleAppStore={{
              url: 'https://apps.apple.com/us/app/edx/id945480667',
              altText: 'Download the edX mobile app from the Apple App Store',
            }}
            googlePlay={{
              url: 'https://play.google.com/store/apps/details?id=org.edx.mobile',
              altText: 'Download the edX mobile app from Google Play',
            }}
            handleAllTrackEvents={() => {}}
          />
        </>
      </IntlProvider>
    );
  }
}

Layout.defaultProps = {
  avatar: null,
  children: [],
  siteName: 'edX',
  siteUrl: 'https://edx.org/',
  username: null,
  headerLogo: null,
  footerLogo: null,
};

Layout.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  siteName: PropTypes.string,
  siteUrl: PropTypes.string,
  username: PropTypes.string,
  headerLogo: PropTypes.string,
  footerLogo: PropTypes.string,
};

const ConnectedLayout = connect(state => ({
  avatar: state.userAccount.profileImage.imageUrlMedium,
  username: state.userAccount.username,
}))(Layout);

export default ConnectedLayout;
