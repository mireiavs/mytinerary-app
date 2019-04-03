import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addItinerary, addItSuccess } from "../actions/itineraryActions"
import { connect } from "react-redux"

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        flexDirection: "column"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
        color: "black"
    },
});


class AddItinerary extends Component {
    state = {
        title: "",
        user: "",
        duration: "",
        price: "",
        hashtag: [],
        cityName: ""
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const newItinerary = {
            title: this.state.title,
            user: this.state.user,
            duration: this.state.duration,
            price: this.state.price,
            hashtag: this.state.hashtag,
            cityName: this.props.match.params.id
        }
        this.props.addItinerary(newItinerary, this.props.match.params.id)
    }
    onClickAfterAdd = () => {
        this.props.addItSuccess()
    }
    render() {
        const { classes } = this.props;
        const addItSuccess = this.props.itineraries.additsuccess
        return (
            <div className="add-city">
                <h1>Add an itinerary</h1>

                {!addItSuccess ? (<form id="itinerary-form" className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>

                <TextField
                        name="cityName"
                        id="cityName"
                        label="City"
                        className={classes.textField}
                        value={this.props.match.params.id}
                        
                        margin="normal"
                        disabled
                    />

                    <TextField
                        name="title"
                        id="title"
                        label="Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />

                    <TextField
                        name="user"
                        id="user"
                        label="User"
                        className={classes.textField}
                        value={this.state.user}
                        onChange={this.onChange}
                        margin="normal"
                    />

                    <TextField
                        name="duration"
                        id="duration"
                        label="Duration (hours)"
                        className={classes.textField}
                        value={this.state.duration}
                        onChange={this.onChange}
                        margin="normal"
                    />

                    <TextField
                        name="price"
                        id="price"
                        label="Price"
                        className={classes.textField}
                        value={this.state.price}
                        onChange={this.onChange}
                        margin="normal"
                    />

                    <TextField
                        name="hashtag"
                        id="hashtag"
                        label="Hashtags"
                        className={classes.textField}
                        value={this.state.hashtag}
                        onChange={this.onChange}
                        margin="normal"
                    />

                    <div className="add-city-btn">
                        <Button variant="contained" className={classes.button} size="medium" type="submit" form="itinerary-form">
                            Submit</Button>
                    </div>
                </form>) : (<div className="success">
                    <p>Itinerary added successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Add another itinerary</Button>
                </div>)}
            </div>
        );
    }
}

AddItinerary.propTypes = {
    itineraries: PropTypes.object,
    classes: PropTypes.object.isRequired,
    addItinerary: PropTypes.func,
    additsuccess: PropTypes.bool,
    addItSuccess: PropTypes.func,
    match: PropTypes.object
};

const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    additsuccess: state.addsuccess,
    addItSuccess: state.addSuccess
})

export default connect(mapStateToProps, { addItinerary, addItSuccess })(withStyles(styles)(AddItinerary));