import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    // initialize the oauth library with client id made in google dev console
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '165459391350-80k8029e1em3nk73l37vcttdutom1n2e.apps.googleusercontent.com',
                // scopes to fetch when user logs in
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // update component level state
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                // add listener
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
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

export default GoogleAuth;