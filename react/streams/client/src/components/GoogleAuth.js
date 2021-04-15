import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    // initialize the oauth library with client id made in google dev console
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '165459391350-80k8029e1em3nk73l37vcttdutom1n2e.apps.googleusercontent.com',
                // scopes to fetch when user logs in
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // dispatch initial action to update auth state (call sign in or sign out whether or not user is either)
                this.onAuthChange(this.auth.isSignedIn.get());
                // add listener
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        // call action creators
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn(this.auth.currentUser.get().getId());
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                     Sign Out
                </button>  
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>  
            )
        }
    };

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

// communicate the signed in state back to the google auth component from redux store
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);