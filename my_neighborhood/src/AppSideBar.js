import React, { Component } from 'react'

class AppSideBar extends Component {

    triggerClickOnMarker = (lat, name, map) => {
        let clickedMarker = this.props.activeMarkers.filter((marker) => {
            return marker.position.lat() === lat && marker.title === name
        })
        if(clickedMarker.length !== 0) {
            clickedMarker[0].setMap(map)
            map.setCenter({
                lat: clickedMarker[0].position.lat(),
                lng: clickedMarker[0].position.lng()
            })
            window.google.maps.event.trigger(clickedMarker[0], 'click')
        }
        return 0
    }

    render() {
        return (
            <div className="component-side-bar">
                <header><i className="fas fa-city"></i>My Nighborhood</header>
                {this.props.markersCategory.map((category) => (
                        <div key={category} className={`${category} category-container`}>
                            <div className="body">
                                <div className="header-text">{category} <button><i className="far fa-eye-slash" data-action="hide" onClick={(e)=>(this.props.markersHider(category, e.target))}></i></button></div>
                                <ul className="markers-list">
                                {
                                    this.props.markers.filter((marker) => (
                                        marker.markerType === category
                                    )).map((marker) => (
                                        <li tabIndex="0" key={`${category}_${marker.marker.title}`} onClick={() =>(this.triggerClickOnMarker(marker.marker.position.lat, marker.marker.title, marker.marker.map))}>{marker.marker.title}</li>
                                    ))
                                }
                                </ul>
                            </div>
                        </div>
                    ))
                }
                <div className="footer">Using <a href="https://developer.foursquare.com/" alt="Foursqueare API">Foursquare API</a></div>
            </div>
        );
    }
}

export default AppSideBar;
