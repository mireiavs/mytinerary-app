import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { register } from "../actions/authActions"
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { clearErrors } from "../actions/errorActions"

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "column",
        alignItems: "center"
    },
    input: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    select: {
        marginTop: theme.spacing.unit * 2,
        fontSize: "1.2rem",
        width: 195
    },
    button: {
        margin: 30,
        marginLeft: "auto",
        marginRight: "auto",
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class Createaccount extends Component {
    state = {
        countries: ["England", "France", "Germany", "Holland", "Ireland", "Spain", "United States"],
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        country: "",
        msg: null,
        alert: false,
        checked: false,
        regSuccess: false
    }

    componentDidMount() {
        this.props.clearErrors()
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === "REGISTRATION_FAIL") {
                this.setState({ msg: error.msg.msg, alert: true })
            } else {
                this.setState({ msg: null })
            }
        }

        if (prevProps.isAuthenticated === false && isAuthenticated === true) {
            this.setState({
                regSuccess: true
            })
        }

    }
    handleClose = () => {
        this.setState({ alert: false });
    };

    handleChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault()

        const { username, password, email, first_name, last_name, country } = this.state

        // Create user object
        const newUser = {
            username,
            password,
            email,
            first_name,
            last_name,
            country
        }

        // Attempt to register
        this.props.register(newUser)
    }

    render() {
        const { classes } = this.props;
        const { alert } = this.state
        const countryList = this.state.countries.map((country, index) => <MenuItem key={index} value={country} className="select-option">{country}</MenuItem>
        )
        return (
            <div>
                <h3 className="title">Create account</h3>

                {!this.state.regSuccess ? <div><Snackbar
                    open={alert}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"><ErrorIcon />  {this.state.msg}</span>}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    autoHideDuration={6000}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />


                    <form className={classes.container} noValidate autoComplete="off" id="register-form" onSubmit={this.onSubmit}>

                        <div className="upload-userpic">
                            {/* TODO: Include option to upload own image*/}
                        </div>

                        <div>
                            <InputLabel htmlFor="username" className="form-label">Username:</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" className="form-label">Password:</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                className={classes.input}
                                type="password"

                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" className="form-label">Email:</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="first_name" className="form-label">First name:</InputLabel>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="last_name" className="form-label">Last name:</InputLabel>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="country" className="form-label">
                                Country:
                            </InputLabel>
                            <Select
                                value={this.state.country}
                                onChange={this.onChange}
                                input={<Input name="country" id="country" />}
                                displayEmpty
                                name="country"
                                className={classes.select}
                            >
                                <MenuItem value="" className="select-option">
                                    Select country
                        </MenuItem>
                                {countryList}
                            </Select>
                        </div>


                        {/* TODO: Include validation of checkbox - server side?*/}
                        {/* TODO: Include modal with T&C */}
                        <div className="terms">
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChecked}
                                value="checked"
                            /> <p>I agree to MYtinerary&apos;s Terms & Conditions</p>
                        </div>


                        <Button variant="contained" className={classes.button} size="medium" type="submit" form="register-form">
                            Create Account</Button>
                    </form></div> : <p>Registration successful!</p>
                }
            </div>
        )
    }
}

Createaccount.propTypes = {
    classes: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.errors
})


export default connect(mapStateToProps, { register, clearErrors })(withStyles(styles)(Createaccount))