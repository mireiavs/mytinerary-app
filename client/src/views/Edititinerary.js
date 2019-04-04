import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCities } from "../actions/citiesActions"
import { deleteItinerary, getItineraries, updateItinerary, addItSuccess } from "../actions/itineraryActions"
import { connect } from "react-redux"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
    buttondel: {
        margin: theme.spacing.unit,
        marginTop: 50,
        backgroundColor: "#ff5252",
        color: "white"
    },
    input: {
        display: 'none',
        color: "black"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Edititinerary extends Component {
    state = {
        name: "",
        country: "",
        title: "",
        user: "",
        rating: "",
        duration: "",
        price: "",
        hashtag: "",
        cityName: "",
        itineraryId: "",
    };
    handleChangeSelectCity = event => {
        const { cities } = this.props.cities
        const city = cities.find(city => city.name === event.target.value)
        this.setState({ name: event.target.value, country: city.country });
        this.props.getItineraries(city.name)
    };
    handleChangeSelectItinerary = event => {
        const { itineraries } = this.props.itineraries
        const itinerary = itineraries.find(itinerary => itinerary.title === event.target.value)
        this.setState({ 
            title: event.target.value, 
            user: itinerary.user,
            rating: itinerary.rating,
            duration: itinerary.duration,
            price: itinerary.price,
            hashtag: itinerary.hashtag,
            cityName: itinerary.cityName,
            itineraryId: itinerary._id
        });
        
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const updatedItinerary = {
            title: this.state.title, 
            user: this.state.user,
            rating: this.state.rating,
            duration: this.state.duration,
            price: this.state.price,
            hashtag: this.state.hashtag,
            cityName: this.state.cityName,
        }
        this.props.updateItinerary(updatedItinerary, this.state.itineraryId)
    }
    onClickAfterAdd = () => {
        this.props.addItSuccess()
    }
    onDeleteClick = id => {
        this.props.deleteItinerary(id)
    }
    componentDidMount() {
        this.props.getCities()
    }
    render() {
        const { classes } = this.props;
        const { cities } = this.props.cities
        const { itineraries } = this.props.itineraries
        const cityList = cities.map(city => <MenuItem value={city.name} key={city._id}>{city.name}, {city.country}</MenuItem>)
        const itineraryList = itineraries.map(itinerary => <MenuItem value={itinerary.title} key={itinerary._id}>{itinerary.title}</MenuItem>)
        const addItSuccess = this.props.itineraries.additsuccess

        return (
            <div className="edit-city">
                <h1>Edit itinerary</h1>
                <p>Select city:</p>
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name">City</InputLabel>
                        <Select
                            value={this.state.name}
                            onChange={this.handleChangeSelectCity}
                            inputProps={{
                                name: 'name',
                                id: 'name',
                            }}
                        >
                            {cityList}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="title">Itinerary</InputLabel>
                        <Select
                            value={this.state.title}
                            onChange={this.handleChangeSelectItinerary}
                            inputProps={{
                                name: 'title',
                                id: 'title',
                            }}
                        >
                            {itineraryList}
                        </Select>
                    </FormControl>
                </form>


                {!addItSuccess ? (<form id="itinerary-form" className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
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
                        color="primary"
                    />
                    <TextField
                        name="rating"
                        id="rating"
                        label="Rating"
                        className={classes.textField}
                        value={this.state.rating}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />
                    <TextField
                        name="duration"
                        id="duration"
                        label="Duration"
                        className={classes.textField}
                        value={this.state.duration}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />
                    <TextField
                        name="price"
                        id="price"
                        label="Price"
                        className={classes.textField}
                        value={this.state.price}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />
                    <TextField
                        name="hashtag"
                        id="hashtag"
                        label="Hashtags"
                        className={classes.textField}
                        value={this.state.hashtag}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />

                            <div className="add-city-btn">
                        <Button variant="contained" className={classes.button} size="medium" type="submit" form="itinerary-form">
                            Submit</Button>
                    </div>
                </form>) : (<div className="success">
                    <p>Itinerary updated successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Edit another itinerary</Button>
                </div>)}

                <Button variant="contained" className={classes.buttondel} size="medium" onClick={this.onDeleteClick.bind(this, this.state.itineraryId)}>Delete itinerary</Button>

            </div>
        );
    }
}

Edititinerary.propTypes = {
    deleteItinerary: PropTypes.func,
    classes: PropTypes.object,
    cities: PropTypes.object,
    itineraries: PropTypes.object,
    getCities: PropTypes.func,
    getItineraries: PropTypes.func,
    updateItinerary: PropTypes.func,
    addItSuccess: PropTypes.func
};

const mapStateToProps = (state) => ({
    cities: state.cities,
    itineraries: state.itineraries
})

export default connect(mapStateToProps, { deleteItinerary, getCities, getItineraries, updateItinerary, addItSuccess })(withStyles(styles)(Edititinerary));