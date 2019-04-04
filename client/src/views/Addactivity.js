
import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
/* import TextField from '@material-ui/core/TextField';
 */import Button from '@material-ui/core/Button';
import { addActivity, addAcSuccess } from "../actions/activityActions"
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


class Addactivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itineraryId: "",
            caption: "",
            activityImage: null,
        };
    }
    onChange = (e) => {
        switch (e.target.name) {
            case 'activityImage':
                this.setState({ activityImage: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { caption, activityImage } = this.state;
        const itineraryId = this.props.match.params.itineraryId

        let formData = new FormData();

        formData.append('caption', caption);
        formData.append('itineraryId', itineraryId);
        formData.append('activityImage', activityImage);

        this.props.addActivity(formData, itineraryId)

        this.setState({
            caption: ""
        })
    }

    /*     onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        onSubmit = e => {
            e.preventDefault();
            const newActivity = {
                itineraryId: this.props.match.params.itineraryId,
                img: this.state.img,
                caption: this.state.caption,
            }
            this.props.addActivity(newActivity, this.props.match.params.itineraryId)
        } */
        onClickAfterAdd = () => {
            this.props.addAcSuccess()
        } 

    render() {
        const { classes } = this.props;
        const addAcSuccess = this.props.activities.addacsuccess;
        return (
            <div className="add-city">
                <h1>Add an activity </h1>

                {!addAcSuccess ? (<form encType="multipart/form-data" onSubmit={this.onSubmit} id="activity-form">
                    Caption: <input type="text" name="caption" value={this.state.caption} onChange={this.onChange} /><br />
                    Upload image: <input type="file" name="activityImage" onChange={this.onChange} />
                    <Button variant="contained" className={classes.button} size="medium" type="submit" form="activity-form">
                        Submit</Button>
                </form>) : (<div className="success">
                    <p>Activity added successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Add another activity</Button>
                </div>)}
            </div>
        );
    }
}

Addactivity.propTypes = {
    activities: PropTypes.object,
    classes: PropTypes.object.isRequired,
    addActivity: PropTypes.func,
    addacsuccess: PropTypes.bool,
    addAcSuccess: PropTypes.func,
    match: PropTypes.object
};

const mapStateToProps = (state) => ({

    activities: state.activities,
    addacsuccess: state.addacsuccess,
})

export default connect(mapStateToProps, { addActivity, addAcSuccess })(withStyles(styles)(Addactivity));