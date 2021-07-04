import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { googleSignIn, googleSignOut } from "../../redux/actions/authActions";
import history from "../../history";
// Style related imports
import "./GoogleAuth.scss";
import GoogleIconImg from "../../assets/icons/google-icon.png";

class GoogleAuth extends React.Component {
  _isMounted = false;
  previousSignedInState = null;
  state = {
    initialized: false,
  };

  componentDidMount() {
    this._isMounted = true;
    console.log(`ismounted is now ${this._isMounted}`);

    // load the Google auth client
    window.gapi.load("client:auth2", () => {
      // initialize the client settings
      window.gapi.client
        .init({
          // Retrieve client ID from .env file on /client
          clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log("initialized auth instance");
          // update redux state, check if user is signed in or not
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for any changes in sign in status, update state
          this.auth.isSignedIn.listen(this.onAuthChange);
          // change the state so that it knows that it finished initializing

          console.log(`ismounted is now ${this._isMounted}`);
          if (this._isMounted) {
            this.setState({ initialized: true });
          }
        });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log(`ismounted is now ${this._isMounted}`);
  }

  onAuthChange = async (isSignedIn) => {
    console.log("changing GoogleAuth auth status");
    console.log("isSignedIn is");
    console.log(isSignedIn);

    if (isSignedIn) {
      const currentUser = this.auth.currentUser.get();
      const userProfile = currentUser.getBasicProfile();
      const fullname = userProfile.getName();
      const email = userProfile.getEmail();
      console.log(`user profile is ${userProfile}`);
      console.log(userProfile);

      await this.props.googleSignIn({
        userId: currentUser.getId(),
        username: fullname.trim(),
        email: email,
      });
    } else {
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = async () => {
    await this.auth.signOut();
    await this.props.googleSignOut();
    history.push("/login");
  };

  renderGoogleSignButton = (text, cb) => {
    const renderIcon = () =>
      !this.props.className ? (
        <img
          className="google-icon-button-img"
          src={GoogleIconImg}
          alt="Google Icon"
        />
      ) : null;

    return (
      <button
        className={`ui primary google button ${this.props.className || null}`}
        id={this.props.buttonId || ""}
        onClick={() => {
          if (cb) {
            cb();
          }
        }}
      >
        {renderIcon()}
        {text}
      </button>
    );
  };

  renderAuthButton = () => {
    if (!this.state.initialized) {
      console.log("rendering null until auth state is initialized");
      return null;
    }
    if (this.props.isSignedIn) {
      return (
        <button
          className={`ui primary google button ${this.props.className || null}`}
          onClick={this.onSignOutClick}
        >
          Logout
        </button>
      );
    } else {
      return this.renderGoogleSignButton("Sign in with Google", () => {
        this.onSignInClick();
      });
    }
  };

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    authMethod: state.auth.authMethod,
  };
};

export default connect(mapStateToProps, { googleSignIn, googleSignOut })(
  GoogleAuth
);
