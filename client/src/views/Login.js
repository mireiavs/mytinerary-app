import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, socialLogin } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

// Material UI imports
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

class Login extends Component {
  state = {
    username: "",
    password: "",
    msg: null,
    alert: false,
    checked: false
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg, alert: true });
      } else {
        this.setState({ msg: null });
      }
    }

    if (prevProps.user !== this.props.user) {
      this.setState({
        loginSuccess: true
      });
      this.props.history.push("/dashboard");
    }
  }

  handleClose = () => {
    this.setState({ alert: false });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const user = {
      username,
      password
    };
    this.props.login(user);
  };

  responseGoogle = response => {
    const user = {
      username: response.profileObj.name,
      email: response.profileObj.email,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      userImage: response.profileObj.imageUrl
    };
    this.props.socialLogin(user);
  };

  onFailure = error => {
    console.log(error);
  };

  render() {
    const { alert } = this.state;

    return (
      <div className="login">
        <h3>Login</h3>

        <Snackbar
          open={alert}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              <ErrorIcon /> {this.state.msg}
            </span>
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          autoHideDuration={6000}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <form
          className="login-form"
          noValidate
          autoComplete="off"
          id="register-form"
          onSubmit={this.onSubmit}
        >
          <div>
            <InputLabel htmlFor="username" className="form-label">
              Username:
            </InputLabel>
            <Input
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>

          <div>
            <InputLabel htmlFor="password" className="form-label">
              Password:
            </InputLabel>
            <Input
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
            />
          </div>

          {/* Remember me checkbox - not functional yet */}
          <div className="terms remember">
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChecked}
              value="checked"
            />{" "}
            <p>Remember Me</p>
          </div>

          <Button
            variant="contained"
            size="medium"
            type="submit"
            form="register-form"
          >
            Login
          </Button>
        </form>

        <div className="google-btn">
          <GoogleLogin
            clientId="1007359330691-dekauisk8c2vg88g59tqprpsdatt9lv9.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="login-text">
          <p>
            Don&apos;t have a MYtinerary account yet? You should create one!
            It&apos;s totally free and only takes a minute.
          </p>
          <Link to="/createaccount" className="login-link">
            Create Account
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func,
  socialLogin: PropTypes.func,
  history: PropTypes.object,
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { login, clearErrors, socialLogin }
)(Login);
