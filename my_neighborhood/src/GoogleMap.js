import React, { Component } from 'react';
import * as FoursquareAPIHandler from "./FoursquareAPIHandler"

class GoogleMap extends Component {
    infowindow = null
    markers = []

    componentDidUpdate = () => {
        if(window.google.maps && this.infowindow === null) {
            this.infowindow = new window.google.maps.InfoWindow()
        }
        this.emptyMarkers()
        this.createNewMarkers()
        this.props.retrieveActiveMarkers(this.markers.filter((marker) => (marker.map !== null)))
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
        content =  `<div tabIndex="0" class="infowindow-title">Title</div>`
        content += `<div tabIndex="0" class="infowindow-img"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFG_HGM8FOU-VpFB8-GsnuTq_XZI3yrw-z7mWcKr-EAZqcl8RAg"></div>`
        content += `<div tabIndex="0" class="infowindow-description">jahsdk ajsdh aksdj ahskdja sdkajshdaksjd akjsd askjdjahsdk ajsdh aksdj ahskdja sdkajshdaksjd akjsd askjdjahsdk ajsdh aksdj ahskdja sdkajshdaksjd akjsd askjdjahsdk ajsdh aksdj ahskdja sdkajshdaksjd akjsd askjdahsdka sdja hk sdjaskdja ksdaks dkajs hdkajs dkajs daksjd aksjdh aksj sdka sdja hk sdjaskdja ksdaks dkajs hdkajs dkajs daksjd aksjdh aksjd</div>`
        content += `<div tabIndex="0" class="infowindow-url">http://www.permanent.com/</div>`
        // FoursquareAPIHandler.getVenueInfo(venue).then((response) => {
        //     content =  `<div tabIndex="0" class="infowindow-title">${marker.title}</div>`
        //     content += (response.venue.bestPhoto)?`<div tabIndex="0" class="infowindow-img"><img src="${response.venue.bestPhoto.prefix}100x150${response.venue.bestPhoto.suffix}"></div>`: ""
        //     content += (response.venue.description)?`<div tabIndex="0" class="infowindow-description">${response.venue.description}</div>`:'<div class="infowindow-description">No description available.</div>'
        //     content += (response.venue.url)?`<div tabIndex="0" class="infowindow-url">${response.venue.url}</div>`:''
        // }).then(() => {
            if(infowindow.marker !== marker) {
                infowindow.marker = marker
                infowindow.setContent(content)
                infowindow.open(marker.map, marker)
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null
                })
            }
        // }).catch((error) => {
        //     alert("A problem has occurred while trying to get information from the API.\nTry again later.")
        // })


    }

    render() {
        return(
            <div id='mapContainer'></div>
        );
    }
}

export default GoogleMap
