import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deleteCity, getCities } from "../actions/citiesActions"
import { connect } from "react-redux"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

class Editcity extends Component {
    state = {
        name: "",
    };
    handleChangeSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onDeleteClick = id => {
        this.props.deleteCity(id)
    }
    componentDidMount() {
        this.props.getCities()
    }
    render() {
        const { classes } = this.props;
        const { cities } = this.props.cities
        const cityList = cities.map(city => <MenuItem value={city.name} key={city._id}>{city.name}</MenuItem>)
        return (
            <div className="edit-city">
                <h1>Edit city</h1>
                <p>Select city:</p>
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name">City</InputLabel>
                        <Select
                            value={this.state.name}
                            onChange={this.handleChangeSelect}
                            inputProps={{
                                name: 'name',
                                id: 'name',
                            }}
                        >
                            {cityList}
                        </Select>
                    </FormControl>
                </form>
                <Button variant="contained" className={classes.button} size="medium" onClick={this.onDeleteClick.bind(this, this.state.name)}>Delete city</Button>
            </div>
        );
    }
}

Editcity.propTypes = {
    deleteCity: PropTypes.func,
    classes: PropTypes.object,
    cities: PropTypes.object,
    getCities: PropTypes.func,
};

const mapStateToProps = (state) => ({
    cities: state.cities
})

export default connect(mapStateToProps, { deleteCity, getCities })(withStyles(styles)(Editcity));