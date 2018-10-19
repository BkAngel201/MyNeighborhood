import React, { Component } from 'react';
import * as FoursquareAPIHandler from "./FoursquareAPIHandler"

class GoogleMap extends Component {
    infowindow = null
    markers = []
    componentDidMount = () => {
        this.infowindow = new window.google.maps.InfoWindow()
        return 0
    }
    componentDidUpdate = () => {
        this.emptyMarkers()
        this.createNewMarkers()
        return 0
    }

    emptyMarkers = () => {
        this.markers.map((marker) => (
            marker.setMap(null)
        ))
        return 0
    }


    createNewMarkers = () => {
        let self = this
        this.props.markers.map((marker) => {
            let newMarker = new window.google.maps.Marker(marker.marker)
            newMarker.addListener('click', function() {
                self.infowindowPopulate(this, self.infowindow, marker.venue)
            })
            self.markers.push(newMarker)
            return 0
        })
        return 0
    }

    infowindowPopulate = (marker, infowindow, venue) => {
        let content = ""
        FoursquareAPIHandler.getVenueInfo(venue).then((response) => {
            content =  `<div>${marker.title}</div>`
            content += (response.venue.bestPhoto)?`<div><img src="${response.venue.bestPhoto.prefix}100x100${response.venue.bestPhoto.suffix}"></div>`: ""
            content += (response.venue.description)?`<div>${response.venue.description}</div>`:''
            content += (response.venue.url)?`<div>${response.venue.url}</div>`:''
            console.log(response);
        }).then(() => {
            if(infowindow.marker !== marker) {
                infowindow.marker = marker
                infowindow.setContent(content)
                infowindow.open(marker.map, marker)
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null
                })
            }
        })


    }

    render() {
        return(
            <div id='mapContainer'></div>
        );
    }
}

export default GoogleMap
