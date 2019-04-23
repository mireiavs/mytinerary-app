import React, { Component } from "react"
import { connect } from "react-redux"
import Itinerary from "../components/Itinerary"
import { getAllItineraries } from "../actions/itineraryActions"
import PropTypes from "prop-types"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            msg: "Please login to see your dashboard.",
            noFavs: false
        };
    }

    // function to collapse all other cards when a specific one is open
    toggle(id) {
        this.setState({ collapse: this.state.collapse === id ? null : id });
    }

    componentDidMount() {
        this.props.getAllItineraries()
    }

    render() {
        const { itineraries } = this.props.itineraries
        const favourites = this.props.auth.favourites
        const msg = this.state.msg
        var itineraryList = ""

        if (favourites) {
            itineraryList = favourites.map((favourite, index) => {
                for (var i = 0; i < itineraries.length; i++) {
                    if (favourite.itineraryId === itineraries[i]._id) {
                        return <Itinerary itinerary={itineraries[i]} key={index} isOpen={this.state.collapse === itineraries[i]._id} toggle={this.toggle} />
                    }
                }
            })
        }

        return (
            <div>
                {this.props.user ?
                    <div className="dashboard">
                        <h2>{this.props.user.first_name}&apos;s Dashboard</h2>
                        <h4>Favourite itineraries</h4>
                        {this.props.auth.favourites.length !== 0 ? <div className="itinerary-list">{itineraryList}</div> : <div>You haven&apos;t added any favourites yet!</div>}
                    </div>
                    : (<div className="result">{msg}</div>)
                }
            </div>
        )
    }
}


Dashboard.propTypes = {
    itineraries: PropTypes.object,
    loading: PropTypes.object,
    auth: PropTypes.object,
    favourites: PropTypes.object,
    getAllItineraries: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    loading: state.loading,
    auth: state.auth,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getAllItineraries })(Dashboard)