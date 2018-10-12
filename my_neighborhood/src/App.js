import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from "./GoogleMap"
import AppSideBar from "./AppSideBar"
import * as FoursquareAPIHandler from "./FoursquareAPIHandler"
//import BodyStructure from './components/BodyStructure'



class App extends Component {
    markersCategory = ["hospitals", "banks", "fast food", "supermarkets"]
    markersPerCategory = 2
    markers = []
    state = {
        center: {
            lat: 28.5162753,
            lng: -81.4025024
        },
        markers: [],
        markersLoaded: false
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
         let self = this
         FoursquareAPIHandler.getCategory(this.markersCategory, this.markersPerCategory, this.state.center.lat + "," + this.state.center.lng)
         .then(function(response) {
             response.map(function(perCategory) {
                 console.log(perCategory);
                perCategory.groups[0].items.map(function(perMarker ) {
                    self.markers.push({markerType: perCategory.query, markerName: perMarker.venue.name, marker: new window.google.maps.Marker({
                            position: {lat: perMarker.venue.location.lat, lng: perMarker.venue.location.lng},
                            map: self.mapContainer,
                            title: perMarker.venue.name,
                            icon: perMarker.venue.categories[0].icon.prefix + "bg_32" + perMarker.venue.categories[0].icon.suffix
                        })
                    })
                })
            })
            self.setState({ markers: self.markers})
        })
    }


    render() {

        return (
            <main>
                <GoogleMap />
                <AppSideBar markersCategory={this.markersCategory} markers={this.state.markers} markersLoaded={this.markersLoaded}/>
            </main>

        );
    }
}

export default App;

        // let newMarkers = []
        // this.markersCategory.map((category) => (
        //     FoursquareAPIHandler.getLocations(`${this.state.center.lat},${this.state.center.lng}`, category, 5).then((response) => (
        // })
        //         ))
        //     ))
        // ))
        // this.markers = newMarkers



        //
        // let promises = []
        // this.markersCategory.map((category) =>(
        //     promises.push(this.setPlaces(this.state.center, this.markersPerCategory, this.createMarker, category, this.mapContainer))
        // ))
        // this.setState({markers: this.markers, markersLoaded: true })
        //
        // }
        //
        // setPlaces = function (center, cantPlaces, createMarker, category, mapContainer) {
        // return new Promise(function(resolve, reject) {
        //    var request = {
        //        location: center,
        //        radius: '1000',
        //        query: category
        //    };
        //    let newMarker
        //    let service = new window.google.maps.places.PlacesService(mapContainer);
        //    service.textSearch(request, function (results, status) {
        //        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //            let counter = (results.length >= cantPlaces) ? cantPlaces : results.length
        //            for (var i = 0; i < counter ; i++) {
        //                //console.log(results[i]);
        //                createMarker(results[i])
        //            }
        //        }
        //    });
        // })
        // }
        // createMarker = (placeInfo) => {
        // this.markers.push( new window.google.maps.Marker({
        //    position: placeInfo.geometry.location,
        //    map: this.mapContainer,
        //    title: placeInfo.name,
        //    icon: {
        //        url: placeInfo.icon,
        //        scaledSize: new window.google.maps.Size(32,32)
        //    }
        // }))
