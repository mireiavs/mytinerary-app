import React, { Component } from "react"
import PropTypes from "prop-types"
import { getItineraries } from "../actions/itineraryActions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Itinerary from "../components/Itinerary"
import Loader from "../components/Loader"

class City extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {};
    }

    toggle(id) {
        this.setState({ collapse: this.state.collapse === id ? null : id });
    }

    componentDidMount() {
        this.props.getItineraries(this.props.match.params.id)
    }
    render() {
        const { itineraries } = this.props.itineraries
        const itineraryList = itineraries.map((itinerary, index) => <Itinerary itinerary={itinerary} key={index} isOpen={this.state.collapse === itinerary._id} toggle={this.toggle} />)
        const isLoading = this.props.itineraries.loading

        return (
            <div className="city-info">
                <h1 className="city-title">{this.props.match.params.id}</h1>
                <h4>Available MYtineraries:</h4>

                {isLoading ?
                    (<Loader />) :
                    (<div>
                        {(itineraries.length !== 0) ?
                            (<div>{itineraryList}</div>) :
                            (<p>Sorry, there no itineraries for this city yet.</p>)
                        }</div>
                    )
                }
                <div className="back-link">
                    <Link to="/cities/all">Choose another city</Link>
                </div>
            </div>
        )
    }
}

City.propTypes = {
    match: PropTypes.object,
    loading: PropTypes.bool,
    getItineraries: PropTypes.func,
    itineraries: PropTypes.object
}


const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    loading: state.loading
})

export default connect(mapStateToProps, { getItineraries })(City)
