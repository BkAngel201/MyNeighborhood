import React, { Component } from 'react'

class LocationSearch extends Component {
    state = {
        locationValue: ""
    }

    updateValue = (e) => {
        this.setState({locationValue: e.target.value})
    }

    validateLocation = () => {
        let geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({'address': this.state.locationValue}, (result, status) => {
            if (status === 'OK') {
                this.props.setLocationCenter({lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()})
                console.log({lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()});
            } else if(status === "INVALID_REQUEST") {
                alert('You need enter a place to look for');
            } else if(status === "ZERO_RESULT") {
                alert("There is no place to show with that name.")
            } else {
                alert('There was a problem. \nPlease try again later.')
            }
        });
    }

    render() {
        return (
            <div className="location-selector">
                <div className="input-controls">
                    <input type="text" placeholder="Look for a Neighborhood" onChange={this.updateValue}/>
                    <button onClick={this.validateLocation}>Search</button>
                </div>
            </div>
        );
    }
}

export default LocationSearch;
