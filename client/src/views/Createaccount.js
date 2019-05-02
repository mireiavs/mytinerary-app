import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { CountryDropdown } from "react-country-region-selector";

// Material UI imports
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

class Createaccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      country: "",
      msg: null,
      alert: false,
      checked: false,
      regSuccess: false,
      userImage: null,
      open: false,
      imgPreview: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearImg = this.clearImg.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTRATION_FAIL") {
        this.setState({ msg: error.msg.msg, alert: true });
      } else {
        this.setState({ msg: null });
      }
    }

    if (prevProps.isAuthenticated === false && isAuthenticated === true) {
      this.setState({
        regSuccess: true
      });
      this.props.history.push("/cities/all");
    }
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleCloseAlert = () => {
    this.setState({ alert: false });
  };

  handleChecked = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  onChange = e => {
    switch (e.target.name) {
      case "userImage":
        if (e.target.files[0]) {
          this.setState({
            userImage: e.target.files[0],
            imgPreview: URL.createObjectURL(e.target.files[0])
          });
        }
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  clearImg = () => {
    this.setState({
      userImage: null,
      imgPreview: null
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.checked) {
      const {
        username,
        password,
        email,
        first_name,
        last_name,
        country,
        userImage
      } = this.state;

      let formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("country", country);
      formData.append("userImage", userImage);

      // Attempt to register
      this.props.register(formData);
    } else {
      this.setState({
        msg:
          "You have to agree to MYtinerary's terms and conditions to be able to create account.",
        alert: true
      });
    }
  };

  render() {
    const { alert } = this.state;
    return (
      <div>
        <h3>Create account</h3>

        <div>
          <Snackbar
            className="snackbar"
            open={alert}
            onClose={this.handleCloseAlert}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <div id="message-id">
                <ErrorIcon className="error-icon" /> {this.state.msg}
              </div>
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
                onClick={this.handleCloseAlert}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />

          <form
            encType="multipart/form-data"
            className="register-form"
            noValidate
            autoComplete="off"
            id="register-form"
            onSubmit={this.onSubmit}
          >
            <div>
              {!this.state.imgPreview ? (
                <div className="upload-userpic">
                  <label htmlFor="userpic">Click to select picture</label>
                  <input
                    type="file"
                    name="userImage"
                    onChange={this.onChange}
                    id="userpic"
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <div className="upload-userpic">
                  <img src={this.state.imgPreview} alt="preview" />
                  <span onClick={this.clearImg}>X</span>
                </div>
              )}
            </div>

            <div className="register-form__inputs">
              <div>
                <InputLabel htmlFor="username">Username:</InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  inputProps={{
                    "aria-label": "Description"
                  }}
                />
              </div>

              <div>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                />
              </div>

              <div>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <InputLabel htmlFor="first_name">First name:</InputLabel>
                <Input
                  id="first_name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <InputLabel htmlFor="last_name">Last name:</InputLabel>
                <Input
                  id="last_name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <InputLabel htmlFor="country">Country:</InputLabel>

                <CountryDropdown
                  className="country-select"
                  value={this.state.country}
                  onChange={val => this.selectCountry(val)}
                />
              </div>
            </div>
            <div className="terms">
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleChecked}
                value="checked"
              />
              <p>
                I agree to MYtinerary&apos;s
                <span className="terms-link" onClick={this.handleOpenModal}>
                  Terms & Conditions
                </span>
              </p>
            </div>
            <Modal open={this.state.open} onClose={this.handleCloseModal}>
              <div className="terms-modal">
                <h3>MYtinerary terms and conditions</h3>
                <p>
                  Lorem ipsum, dolor sit consectetur adipisicing elit. Minus cum
                  mollitia molestiae eveniet harum error dolorum molestias
                  voluptates. Provident veritatis beatae iste ratione,
                  aspernatur quos quam perferendis nihil. Consequatur, nemo!
                </p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minus cum mollitia molestiae eveniet harum error dolorum
                  molestias voluptates. Provident veritatis beatae iste ratione,
                  aspernatur quos quam perferendis nihil. Consequatur, nemo!
                </p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minus cum mollitia molestiae eveniet harum error dolorum
                  molestias voluptates. Provident veritatis beatae iste ratione,
                  aspernatur quos quam perferendis nihil. Consequatur, nemo!
                </p>
                <span onClick={this.handleCloseModal} className="terms-link">
                  Close
                </span>
              </div>
            </Modal>
            <Button
              variant="contained"
              className="register-btn"
              size="medium"
              type="submit"
              form="register-form"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Createaccount.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Createaccount);
