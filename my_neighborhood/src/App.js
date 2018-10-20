import React, { Component } from 'react';
import './App.css';
import GoogleMap from "./GoogleMap"
import AppSideBar from "./AppSideBar"
import LoadingScreen from "./LoadingScreen"
import * as FoursquareAPIHandler from "./FoursquareAPIHandler"
//import BodyStructure from './components/BodyStructure'



class App extends Component {
    markersCategory = ["hospitals", "banks", "fast food", "supermarkets"]
    markersPerCategory = 2
    activeMarkers: []
    state = {
        center: {
            lat: 28.5162753,
            lng: -81.4025024
        },
        markers: [],
        activeMarkers: [],
        contentLoaded: false,
        mapContainer: null
    }


    componentDidMount = () => {
        window.initMap = this.initMap
        this.loadScriptTag("https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2EHef-1H-Vz1ZSGniGLuMKehhswfpS9U&v=3&callback=initMap")
        return 0
    }

    loadScriptTag = (url) => {
        let refer = window.document.getElementsByTagName("script")[0]
        let script = window.document.createElement("script");
        script.src = url
        script.async = true
        script.defer = true
        refer.parentNode.insertBefore(script, refer)
        return 0
    }

    initMap = () => {
        this.setState({mapContainer: new window.google.maps.Map(document.getElementById('mapContainer'), {
             center: this.state.center,
             zoom: 12,
             mapTypeId: window.google.maps.MapTypeId.ROADMAP,
             disableDefaultUI: true,
             styles: [{
                 featureType: "poi",
                 stylers: [
                       { visibility: "off" }
                 ]
             }]
         })})

         let markers = []
         let self = this
         if(this.state.markers.length === 0) {
             FoursquareAPIHandler.getCategory(this.markersCategory, this.markersPerCategory, this.state.center.lat + "," + this.state.center.lng)
             .then(function(response) {
                 response.map(function(perCategory) {
                 perCategory.groups[0].items.map(function(perMarker ) {
                        let marker = {
                                position: {lat: perMarker.venue.location.lat, lng: perMarker.venue.location.lng},
                                map: self.state.mapContainer,
                                title: perMarker.venue.name,
                                icon: perMarker.venue.categories[0].icon.prefix + "bg_32" + perMarker.venue.categories[0].icon.suffix
                            }
                        markers.push({markerType: perCategory.query, markerName: perMarker.venue.name, venue:perMarker.venue.id, marker: marker})
                        return 0
                    })
                    return 0
                })

                self.setState({ markers: markers})
                return 0
            }).catch(function(error) {
                alert("A problem has occurred while trying to get information from the API.\nPlease refresh the page again.")
            })
        }
    }

    retrieveActiveMarkers = (markers) => {
        if(this.state.activeMarkers.length !== markers.length) {
            this.setState({activeMarkers: markers})
            if(this.state.contentLoaded === false) {
                this.setState({contentLoaded: true})
            }
        }


        return 0
    }

    hideMarkersCategory = (category, object) => {
        let self = this
        let markers = this.state.markers
            if(object.getAttribute("data-action") === "hide") {
                markers.filter((marker) => (marker.markerType === category)).map((marker) => (
                    marker.marker.map = null
                ))
                object.setAttribute("data-action", "show")
                object.setAttribute("class", "far fa-eye")
            } else {
                markers.filter((marker) => (marker.markerType === category)).map((marker) => (
                    marker.marker.map = self.state.mapContainer
                ))
                object.setAttribute("data-action", "hide")
                object.setAttribute("class", "far fa-eye-slash")
            }
        this.setState({markers: markers})
    }

    render() {

        return (
            <main>
                {!this.state.contentLoaded && (<LoadingScreen/>)}

                <GoogleMap
                    markers={this.state.markers}
                    retrieveActiveMarkers={this.retrieveActiveMarkers}
                />
                <AppSideBar
                    markersCategory={this.markersCategory}
                    markers={this.state.markers}
                    markersLoaded={this.markersLoaded}
                    markersHider={this.hideMarkersCategory}
                    activeMarkers={this.state.activeMarkers}
                />
            </main>

        );
    }
}

export default App;
