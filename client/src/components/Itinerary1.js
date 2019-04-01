
import React, { Component } from 'react';

class Itinerary extends Component {
    render() {
        const itinerary = this.props.itinerary
        return (
            <p>{itinerary.title}</p>
        )
    }
}

export default Itinerary