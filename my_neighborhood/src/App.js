import React, { Component } from 'react';
import './App.css';
import GoogleMap from "./GoogleMap"
import AppSideBar from "./AppSideBar"
import * as FoursquareAPIHandler from "./FoursquareAPIHandler"
//import BodyStructure from './components/BodyStructure'



class App extends Component {
    markersCategory = ["hospitals", "banks", "fast food", "supermarkets"]
    markersPerCategory = 2
    state = {
        center: {
            lat: 28.5162753,
            lng: -81.4025024
        },
        markers: [],
    }
    mapContainer = null

    componentDidMount = () => {
        this.mapContainer = new window.google.maps.Map(document.getElementById('mapContainer'), {
             center: this.state.center,
             zoom: 12,
             mapTypeId: window.google.maps.MapTypeId.ROADMAP,
             styles: [{
                 featureType: "poi",
                 stylers: [
                       { visibility: "off" }
                 ]
             }]
         })

         let markers = []
         let self = this
         if(this.state.markers.length === 0) {
             FoursquareAPIHandler.getCategory(this.markersCategory, this.markersPerCategory, this.state.center.lat + "," + this.state.center.lng)
             .then(function(response) {
                 response.map(function(perCategory) {
                 perCategory.groups[0].items.map(function(perMarker ) {
                        let marker = {
                                position: {lat: perMarker.venue.location.lat, lng: perMarker.venue.location.lng},
                                map: self.mapContainer,
                                title: perMarker.venue.name,
                                icon: perMarker.venue.categories[0].icon.prefix + "bg_32" + perMarker.venue.categories[0].icon.suffix
                            }
                        markers.push({markerType: perCategory.query, markerName: perMarker.venue.name, venue:perMarker.venue.id, marker: marker})
                        return 0
                    })
                    return 0
                })

                self.setState({ markers: markers})
                return
            })
        }
    }

    hideMarkersCategory = (category, object) => {
        let self = this
        let markers = this.state.markers
            if(object.getAttribute("data-action") === "hide") {
                markers.filter((marker) => (marker.markerType === category)).map((marker) => {
                    marker.marker.map = null
                })
                object.setAttribute("data-action", "show")
                object.setAttribute("class", "far fa-eye")
            } else {
                markers.filter((marker) => (marker.markerType === category)).map((marker) => {
                    marker.marker.map = self.mapContainer
                })
                object.setAttribute("data-action", "hide")
                object.setAttribute("class", "far fa-eye-slash")
            }
        this.setState({markers: markers})
    }

    render() {

        return (
            <main>
                <GoogleMap
                    markers={this.state.markers}
                />
                <AppSideBar
                    markersCategory={this.markersCategory}
                    markers={this.state.markers}
                    markersLoaded={this.markersLoaded}
                    markersHider={this.hideMarkersCategory}
                />
            </main>

        );
    }
}

export default App;
